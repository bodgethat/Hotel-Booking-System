import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBooking,
  cancelBooking,
  getAllBookings,
  testBookingCreation
} from '../controllers/bookingController.js';
import authGuard from '../middleware/authGuard.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

// Test endpoint for debugging booking creation
router.post('/test', authGuard, testBookingCreation);

// Debug endpoint to check all bookings (temporary for troubleshooting)
router.get('/debug/all', authGuard, async (req, res) => {
  try {
    const { bookings } = await import('../controllers/bookingController.js');
    res.json({
      success: true,
      message: 'Debug: All bookings in system',
      totalBookings: bookings.length,
      data: bookings,
      currentUser: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Debug endpoint error',
      error: error.message
    });
  }
});

// Protected routes (require authentication)
router.post('/', authGuard, createBooking);
router.get('/', authGuard, getUserBookings);
router.get('/:id', authGuard, getBooking);
router.put('/:id/cancel', authGuard, cancelBooking);

// Admin routes
router.get('/admin/all', authGuard, isAdmin, getAllBookings);

export default router;