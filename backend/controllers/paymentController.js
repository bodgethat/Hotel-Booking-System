const Payment = require('../models/Payment')
const Booking = require('../models/Booking')

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - booking
 *         - amount
 *         - paymentMethod
 *       properties:
 *         booking:
 *           type: string
 *           description: Booking ID
 *         amount:
 *           type: number
 *           description: Payment amount
 *         paymentMethod:
 *           type: string
 *           enum: [esewa, khalti, ime_pay, card]
 *           description: Payment method
 *         status:
 *           type: string
 *           enum: [pending, completed, failed, refunded]
 *           description: Payment status
 */

/**
 * @swagger
 * /api/payments/process:
 *   post:
 *     summary: Process payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingId
 *               - paymentMethod
 *             properties:
 *               bookingId:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Booking not found
 */
const processPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod } = req.body
    const userId = req.user.id

    const booking = await Booking.findOne({ _id: bookingId, user: userId })
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    // Create payment record
    const payment = await Payment.create({
      booking: bookingId,
      amount: booking.totalAmount,
      paymentMethod,
      status: 'pending'
    })

    // TODO: Integrate with actual payment gateways
    // For now, simulate successful payment
    payment.status = 'completed'
    payment.transactionId = `TXN_${Date.now()}`
    await payment.save()

    // Update booking status
    booking.status = 'confirmed'
    await booking.save()

    res.json({
      success: true,
      data: payment,
      message: 'Payment processed successfully'
    })
  } catch (error) {
    console.error('Process payment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * @swagger
 * /api/payments/verify:
 *   post:
 *     summary: Verify payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transactionId
 *             properties:
 *               transactionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified
 *       404:
 *         description: Payment not found
 */
const verifyPayment = async (req, res) => {
  try {
    const { transactionId } = req.body

    const payment = await Payment.findOne({ transactionId })
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' })
    }

    res.json({
      success: true,
      data: payment
    })
  } catch (error) {
    console.error('Verify payment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * @swagger
 * /api/payments/history:
 *   get:
 *     summary: Get payment history
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments
 */
const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id

    const payments = await Payment.find()
      .populate({
        path: 'booking',
        match: { user: userId },
        populate: {
          path: 'hotel',
          select: 'name city'
        }
      })
      .sort({ createdAt: -1 })

    // Filter out payments for other users
    const userPayments = payments.filter(payment => payment.booking)

    res.json({
      success: true,
      data: userPayments
    })
  } catch (error) {
    console.error('Get payment history error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * @swagger
 * /api/payments/{id}/refund:
 *   post:
 *     summary: Process refund
 *     tags: [Payments]
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
 *         description: Refund processed successfully
 *       404:
 *         description: Payment not found
 *       400:
 *         description: Refund not allowed
 */
const processRefund = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const payment = await Payment.findById(id)
      .populate({
        path: 'booking',
        match: { user: userId }
      })

    if (!payment || !payment.booking) {
      return res.status(404).json({ message: 'Payment not found' })
    }

    if (!payment.canBeRefunded()) {
      return res.status(400).json({ message: 'Refund not allowed' })
    }

    // TODO: Integrate with actual payment gateways for refund
    payment.status = 'refunded'
    await payment.save()

    res.json({
      success: true,
      data: payment,
      message: 'Refund processed successfully'
    })
  } catch (error) {
    console.error('Process refund error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  processPayment,
  verifyPayment,
  getPaymentHistory,
  processRefund
} 