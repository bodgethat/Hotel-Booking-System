import express from 'express';
import {
  getAllHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel
} from '../controllers/hotelsController.js';
import authGuard from '../middleware/authGuard.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

// Public routes
router.get('/', getAllHotels);
router.get('/:id', getHotel);

// Protected routes (admin only)
router.post('/', authGuard, isAdmin, createHotel);
router.put('/:id', authGuard, isAdmin, updateHotel);
router.delete('/:id', authGuard, isAdmin, deleteHotel);

export default router;