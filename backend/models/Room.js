const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - hotel
 *         - roomNumber
 *         - type
 *         - price
 *         - capacity
 *       properties:
 *         hotel:
 *           type: string
 *           description: Reference to the hotel this room belongs to
 *         roomNumber:
 *           type: string
 *           description: Room number or identifier
 *         type:
 *           type: string
 *           enum: [single, double, triple, suite, deluxe]
 *           description: Type of room
 *         price:
 *           type: number
 *           description: Price per night
 *         capacity:
 *           type: number
 *           description: Maximum number of guests
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *           description: List of room amenities
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of room image URLs
 *         isAvailable:
 *           type: boolean
 *           default: true
 *           description: Whether the room is available for booking
 *         description:
 *           type: string
 *           description: Room description
 */

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: [true, 'Hotel reference is required']
  },
  roomNumber: {
    type: String,
    required: [true, 'Room number is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Room type is required'],
    enum: ['single', 'double', 'triple', 'suite', 'deluxe'],
    default: 'single'
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1'],
    max: [10, 'Capacity cannot exceed 10']
  },
  amenities: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    trim: true
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  size: {
    type: Number, // in square meters
    min: [10, 'Room size must be at least 10 sqm']
  },
  floor: {
    type: Number,
    min: [1, 'Floor must be at least 1']
  },
  view: {
    type: String,
    enum: ['city', 'garden', 'mountain', 'ocean', 'pool', 'street'],
    default: 'city'
  },
  smoking: {
    type: Boolean,
    default: false
  },
  petFriendly: {
    type: Boolean,
    default: false
  },
  wifi: {
    type: Boolean,
    default: true
  },
  airConditioning: {
    type: Boolean,
    default: true
  },
  tv: {
    type: Boolean,
    default: true
  },
  minibar: {
    type: Boolean,
    default: false
  },
  balcony: {
    type: Boolean,
    default: false
  },
  bathroom: {
    type: String,
    enum: ['private', 'shared'],
    default: 'private'
  },
  bedType: {
    type: String,
    enum: ['single', 'double', 'queen', 'king', 'twin'],
    default: 'single'
  }
}, {
  timestamps: true
});

// Index for efficient queries
roomSchema.index({ hotel: 1, isAvailable: 1 });
roomSchema.index({ hotel: 1, type: 1 });
roomSchema.index({ price: 1 });

// Virtual for availability status
roomSchema.virtual('availabilityStatus').get(function() {
  return this.isAvailable ? 'Available' : 'Occupied';
});

// Method to check if room is available for specific dates
roomSchema.methods.isAvailableForDates = async function(checkIn, checkOut) {
  const Booking = mongoose.model('Booking');
  
  const conflictingBooking = await Booking.findOne({
    room: this._id,
    status: { $in: ['confirmed', 'pending'] },
    $or: [
      {
        checkIn: { $lt: checkOut },
        checkOut: { $gt: checkIn }
      }
    ]
  });

  return !conflictingBooking;
};

// Ensure virtual fields are serialized
roomSchema.set('toJSON', { virtuals: true });
roomSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Room', roomSchema); 