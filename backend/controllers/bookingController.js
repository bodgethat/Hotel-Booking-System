// Simple in-memory booking storage for demo (replace with database in production)
export let bookings = [];

/**
 * @desc    Create new booking
 * @route   POST /api/bookings
 * @access  Private
 */
export const createBooking = async (req, res) => {
  try {
    const {
      hotelId,
      checkIn,
      checkOut,
      guests,
      roomType,
      totalPrice,
      paymentMethod,
      specialRequests
    } = req.body;

    console.log('Received booking data:', req.body); // Debug log

    // Validate required fields
    if (!hotelId || !checkIn || !checkOut || !guests || !totalPrice) {
      console.log('Missing required fields:', { hotelId, checkIn, checkOut, guests, totalPrice });
      return res.status(400).json({
        success: false,
        message: 'Missing required booking information'
      });
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison

    if (checkInDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Check-in date cannot be in the past'
      });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date'
      });
    }

    // Calculate nights
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    // Get hotel information (from hotels array)
    const { hotels } = await import('./hotelsController.js');
    const hotel = hotels.find(h => h.id === parseInt(hotelId));
    const hotelName = hotel ? hotel.name : 'Unknown Hotel';

    // Create new booking
    const newBooking = {
      id: Date.now(), // Use timestamp for unique ID
      userId: req.user.id,
      hotelId: parseInt(hotelId),
      hotelName: hotelName,
      checkIn: checkIn, // Keep as string for frontend compatibility
      checkOut: checkOut, // Keep as string for frontend compatibility
      guests: parseInt(guests),
      roomType: roomType || 'standard',
      totalAmount: parseFloat(totalPrice), // Use totalAmount for frontend compatibility
      nights: nights,
      paymentMethod: paymentMethod || 'pending',
      specialRequests: specialRequests || '',
      status: 'confirmed',
      guestName: req.user.name,
      guestEmail: req.user.email,
      guestPhone: req.user.phone || '',
      createdAt: new Date().toISOString(),
      bookingDate: new Date().toISOString()
    };

    bookings.push(newBooking);

    console.log('Created booking:', newBooking); // Debug log
    console.log('Total bookings:', bookings.length); // Debug log

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking'
    });
  }
};

/**
 * @desc    Get user bookings
 * @route   GET /api/bookings
 * @access  Private
 */
export const getUserBookings = async (req, res) => {
  try {
    console.log('Getting bookings for user:', req.user.id);
    console.log('Total bookings in system:', bookings.length);
    console.log('All bookings:', bookings);

    const userBookings = bookings.filter(booking => booking.userId === req.user.id);
    
    console.log('User bookings found:', userBookings.length);
    console.log('User bookings:', userBookings);

    res.json({
      success: true,
      count: userBookings.length,
      data: userBookings
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings'
    });
  }
};

/**
 * @desc    Get single booking
 * @route   GET /api/bookings/:id
 * @access  Private
 */
export const getBooking = async (req, res) => {
  try {
    const booking = bookings.find(b => 
      b.id === parseInt(req.params.id) && b.userId === req.user.id
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking'
    });
  }
};

/**
 * @desc    Cancel booking
 * @route   PUT /api/bookings/:id/cancel
 * @access  Private
 */
export const cancelBooking = async (req, res) => {
  try {
    const bookingIndex = bookings.findIndex(b => 
      b.id === parseInt(req.params.id) && b.userId === req.user.id
    );

    if (bookingIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if booking can be cancelled (e.g., not within 24 hours of check-in)
    const booking = bookings[bookingIndex];
    const checkInDate = new Date(booking.checkIn);
    const now = new Date();
    const timeDiff = checkInDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);

    if (hoursDiff < 24) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel booking within 24 hours of check-in'
      });
    }

    bookings[bookingIndex].status = 'cancelled';
    bookings[bookingIndex].cancelledAt = new Date();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: bookings[bookingIndex]
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking'
    });
  }
};

/**
 * @desc    Get all bookings (Admin only)
 * @route   GET /api/bookings/admin/all
 * @access  Private/Admin
 */
export const getAllBookings = async (req, res) => {
  try {
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching all bookings'
    });
  }
};

/**
 * @desc    Test booking creation (for debugging)
 * @route   POST /api/bookings/test
 * @access  Private
 */
export const testBookingCreation = async (req, res) => {
  try {
    console.log('=== BOOKING TEST START ===');
    console.log('Current bookings count:', bookings.length);
    console.log('All bookings:', bookings);
    console.log('User:', req.user);
    
    // Create a test booking
    const testBooking = {
      id: Date.now(),
      userId: req.user.id,
      hotelId: 1,
      hotelName: 'Test Hotel',
      checkIn: '2025-08-05',
      checkOut: '2025-08-07',
      guests: 2,
      roomType: 'standard',
      totalAmount: 200,
      nights: 2,
      paymentMethod: 'pending',
      specialRequests: 'Test booking',
      status: 'confirmed',
      guestName: req.user.name,
      guestEmail: req.user.email,
      guestPhone: req.user.phone || '',
      createdAt: new Date().toISOString(),
      bookingDate: new Date().toISOString()
    };

    bookings.push(testBooking);
    
    console.log('Test booking created:', testBooking);
    console.log('New bookings count:', bookings.length);
    console.log('=== BOOKING TEST END ===');

    res.json({
      success: true,
      message: 'Test booking created successfully',
      data: testBooking,
      totalBookings: bookings.length,
      allBookings: bookings
    });
  } catch (error) {
    console.error('Test booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Test booking failed',
      error: error.message
    });
  }
};
