const express = require('express');
const router = express.Router();

const authGuard = require('../middleware/authGuard');
const {
  processPayment,
  verifyPayment,
  getPaymentHistory,
  processRefund
} = require('../controllers/paymentController');

// Protected routes
router.use(authGuard);

router.post('/process', processPayment);
router.post('/verify', verifyPayment);
router.get('/history', getPaymentHistory);
router.post('/:id/refund', processRefund);

module.exports = router; 