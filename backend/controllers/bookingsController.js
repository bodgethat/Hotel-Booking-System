const Booking = require('../models/Booking')
const Room = require('../models/Room')
const Hotel = require('../models/Hotel')

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - user
 *         - hotel
 *         - room
 *         - checkIn
 *         - checkOut
 *         - guests
 *         - totalAmount
 *       properties:
 *         user:
 *           type: string
 *           description: User ID
 *         hotel:
 *           type: string
 *           description: Hotel ID
 *         room:
 *           type: string
 *           description: Room ID
 *         checkIn:
 *           type: string
 *           format: date
 *           description: Check-in date
 *         checkOut:
 *           type: string
 *           format: date
 *           description: Check-out date
 *         guests:
 *           type: number
 *           description: Number of guests
 *         totalAmount:
 *           type: number
 *           description: Total booking amount
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled, completed]
 *           description: Booking status
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hotelId
 *               - roomId
 *               - checkIn
 *               - checkOut
 *               - guests
 *             properties:
 *               hotelId:
 *                 type: string
 *               roomId:
 *                 type: string
 *               checkIn:
 *                 type: string
 *                 format: date
 *               checkOut:
 *                 type: string
 *                 format: date
 *               guests:
 *                 type: number
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Hotel or room not found
 */
const createBooking = async (req, res) => {
  try {
    const { hotelId, roomId, checkIn, checkOut, guests } = req.body
    const userId = req.user.id

    // Check if room is available for the dates
    const room = await Room.findById(roomId)
    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }

    const isAvailable = await room.isAvailableForDates(checkIn, checkOut)
    if (!isAvailable) {
      return res.status(400).json({ message: 'Room is not available for the selected dates' })
    }

    // Calculate total amount
    const numberOfNights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    const totalAmount = room.price * numberOfNights

    const booking = await Booking.create({
      user: userId,
      hotel: hotelId,
      room: roomId,
      checkIn,
      checkOut,
      guests,
      totalAmount,
      status: 'pending'
    })

    res.status(201).json({
      success: true,
      data: booking
    })
  } catch (error) {
    console.error('Create booking error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get user's bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's bookings
 */
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id
    const bookings = await Booking.find({ user: userId })
      .populate('hotel', 'name city country')
      .populate('room', 'roomNumber type price')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      data: bookings
    })
  } catch (error) {
    console.error('Get user bookings error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * @swagger
 * /api/bookings/history:
 *   get:
 *     summary: Get user's booking history
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's booking history
 */
const getBookingHistory = async (req, res) => {
  try {
    const userId = req.user.id
    const bookings = await Booking.find({ 
      user: userId,
      status: { $in: ['completed', 'cancelled'] }
    })
      .populate('hotel', 'name city country')
      .populate('room', 'roomNumber type price')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      data: bookings
    })
  } catch (error) {
    console.error('Get booking history error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Booking not found
 */
const getBooking = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const booking = await Booking.findOne({ _id: id, user: userId })
      .populate('hotel', 'name city country address phone')
      .populate('room', 'roomNumber type price capacity')

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    res.json({
      success: true,
      data: booking
    })
  } catch (error) {
    console.error('Get booking error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   put:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       404:
 *         description: Booking not found
 *       400:
 *         description: Booking cannot be cancelled
 */
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const booking = await Booking.findOne({ _id: id, user: userId })

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    if (!booking.canBeCancelled()) {
      return res.status(400).json({ message: 'Booking cannot be cancelled' })
    }

    booking.status = 'cancelled'
    await booking.save()

    res.json({
      success: true,
      data: booking,
      message: 'Booking cancelled successfully'
    })
  } catch (error) {
    console.error('Cancel booking error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  createBooking,
  getUserBookings,
  getBookingHistory,
  getBooking,
  cancelBooking
} 