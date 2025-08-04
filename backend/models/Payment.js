const mongoose = require('mongoose');

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
 *         - status
 *       properties:
 *         booking:
 *           type: string
 *           description: Reference to the booking
 *         amount:
 *           type: number
 *           description: Payment amount
 *         paymentMethod:
 *           type: string
 *           enum: [esewa, khalti, ime_pay, cash, card]
 *           description: Payment method used
 *         status:
 *           type: string
 *           enum: [pending, success, failed, refunded]
 *           description: Payment status
 *         transactionId:
 *           type: string
 *           description: Gateway transaction ID
 *         gatewayResponse:
 *           type: object
 *           description: Raw response from payment gateway
 */

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Booking reference is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'NPR',
    enum: ['NPR', 'USD', 'EUR', 'INR']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['esewa', 'khalti', 'ime_pay', 'cash', 'card']
  },
  status: {
    type: String,
    required: [true, 'Payment status is required'],
    enum: ['pending', 'success', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  gatewayTransactionId: String,
  gatewayResponse: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  gatewayError: {
    code: String,
    message: String,
    details: mongoose.Schema.Types.Mixed
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  refundDate: Date,
  refundAmount: {
    type: Number,
    default: 0
  },
  refundReason: {
    type: String,
    maxlength: [200, 'Refund reason cannot exceed 200 characters']
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  ipAddress: String,
  userAgent: String,
  deviceInfo: {
    type: String,
    enum: ['web', 'mobile', 'tablet'],
    default: 'web'
  },
  processingFee: {
    type: Number,
    default: 0
  },
  taxAmount: {
    type: Number,
    default: 0
  },
  netAmount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  receiptUrl: String,
  invoiceUrl: String
}, {
  timestamps: true
});

// Index for efficient queries
paymentSchema.index({ booking: 1 });
paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ status: 1, paymentDate: -1 });
paymentSchema.index({ paymentMethod: 1, status: 1 });

// Pre-save middleware to generate transaction ID if not provided
paymentSchema.pre('save', function(next) {
  if (!this.transactionId) {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.transactionId = `TXN-${timestamp}-${random}`;
  }
  
  // Calculate net amount
  this.netAmount = this.amount - this.processingFee - this.taxAmount;
  
  next();
});

// Virtual for payment status color
paymentSchema.virtual('statusColor').get(function() {
  const statusColors = {
    pending: 'yellow',
    success: 'green',
    failed: 'red',
    refunded: 'blue',
    cancelled: 'gray'
  };
  return statusColors[this.status] || 'gray';
});

// Virtual for formatted amount
paymentSchema.virtual('formattedAmount').get(function() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: this.currency
  }).format(this.amount);
});

// Method to check if payment can be refunded
paymentSchema.methods.canBeRefunded = function() {
  return this.status === 'success' && !this.refundDate;
};

// Method to process refund
paymentSchema.methods.processRefund = async function(refundAmount, reason) {
  if (!this.canBeRefunded()) {
    throw new Error('Payment cannot be refunded');
  }
  
  if (refundAmount > this.amount) {
    throw new Error('Refund amount cannot exceed payment amount');
  }
  
  this.refundAmount = refundAmount;
  this.refundReason = reason;
  this.refundDate = new Date();
  
  if (refundAmount === this.amount) {
    this.status = 'refunded';
  }
  
  return this.save();
};

// Ensure virtual fields are serialized
paymentSchema.set('toJSON', { virtuals: true });
paymentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Payment', paymentSchema); 