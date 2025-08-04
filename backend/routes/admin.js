import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllBookings
} from '../controllers/adminController.js';
import authGuard from '../middleware/authGuard.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(authGuard);
router.use(isAdmin);

// Dashboard routes
router.get('/dashboard', getDashboardStats);

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Booking management routes
router.get('/bookings', getAllBookings);

export default router;