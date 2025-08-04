const mongoose = require('mongoose');

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
 *           description: Reference to the user making the booking
 *         hotel:
 *           type: string
 *           description: Reference to the hotel
 *         room:
 *           type: string
 *           description: Reference to the specific room
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
 *           default: pending
 *           description: Booking status
 *         paymentStatus:
 *           type: string
 *           enum: [pending, paid, failed, refunded]
 *           default: pending
 *           description: Payment status
 *         specialRequests:
 *           type: string
 *           description: Special requests from guest
 */

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: [true, 'Hotel reference is required']
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'Room reference is required']
  },
  checkIn: {
    type: Date,
    required: [true, 'Check-in date is required']
  },
  checkOut: {
    type: Date,
    required: [true, 'Check-out date is required']
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'At least 1 guest is required'],
    max: [10, 'Maximum 10 guests allowed']
  },
  guestDetails: [{
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    idType: {
      type: String,
      enum: ['passport', 'national_id', 'driving_license'],
      default: 'passport'
    },
    idNumber: String
  }],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  roomPrice: {
    type: Number,
    required: [true, 'Room price is required']
  },
  numberOfNights: {
    type: Number,
    required: [true, 'Number of nights is required'],
    min: [1, 'At least 1 night is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded', 'partial'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['esewa', 'khalti', 'ime_pay', 'cash', 'card'],
    default: 'esewa'
  },
  paymentDetails: {
    transactionId: String,
    paymentGateway: String,
    paymentDate: Date,
    amount: Number
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot exceed 500 characters']
  },
  cancellationReason: {
    type: String,
    maxlength: [200, 'Cancellation reason cannot exceed 200 characters']
  },
  cancellationDate: Date,
  cancellationFee: {
    type: Number,
    default: 0
  },
  refundAmount: {
    type: Number,
    default: 0
  },
  invoiceNumber: {
    type: String,
    unique: true
  },
  invoiceSent: {
    type: Boolean,
    default: false
  },
  invoiceSentDate: Date,
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  review: {
    type: String,
    maxlength: [500, 'Review cannot exceed 500 characters']
  },
  reviewDate: Date
}, {
  timestamps: true
});

// Index for efficient queries
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ hotel: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ room: 1, status: 1 });
bookingSchema.index({ status: 1, paymentStatus: 1 });

// Pre-save middleware to generate invoice number
bookingSchema.pre('save', function(next) {
  if (!this.invoiceNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.invoiceNumber = `INV-${timestamp}-${random}`;
  }
  
  // Calculate number of nights
  if (this.checkIn && this.checkOut) {
    const checkIn = new Date(this.checkIn);
    const checkOut = new Date(this.checkOut);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    this.numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
  
  next();
});

// Virtual for booking duration
bookingSchema.virtual('duration').get(function() {
  if (this.checkIn && this.checkOut) {
    const checkIn = new Date(this.checkIn);
    const checkOut = new Date(this.checkOut);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
  return 0;
});

// Virtual for booking status color
bookingSchema.virtual('statusColor').get(function() {
  const statusColors = {
    pending: 'yellow',
    confirmed: 'green',
    cancelled: 'red',
    completed: 'blue',
    no_show: 'gray'
  };
  return statusColors[this.status] || 'gray';
});

// Method to calculate total amount
bookingSchema.methods.calculateTotal = function() {
  return this.roomPrice * this.numberOfNights;
};

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const checkIn = new Date(this.checkIn);
  const hoursUntilCheckIn = (checkIn - now) / (1000 * 60 * 60);
  
  return this.status === 'confirmed' && hoursUntilCheckIn > 24;
};

// Ensure virtual fields are serialized
bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Booking', bookingSchema); 