import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Star, MapPin, Phone, Mail, Globe, Calendar, Users, CreditCard, ArrowLeft, Heart, Share2, Wifi, Car, Utensils, Waves, Dumbbell, Coffee, Shield, Tv, Wind } from 'lucide-react';
import { hotelImages, roomImages } from '../assets/images/hotels';
import toast from 'react-hot-toast';
import axios from 'axios';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'standard',
    specialRequests: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Fetch hotel data from backend
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        if (response.data.success) {
          setHotel(response.data.data);
        } else {
          toast.error('Hotel not found');
          navigate('/hotels');
        }
      } catch (error) {
        console.error('Error fetching hotel:', error);
        toast.error('Failed to load hotel details');
        navigate('/hotels');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchHotel();
    }
  }, [id, navigate]);

  // Create image gallery array
  const getHotelImages = () => {
    if (!hotel) return [];
    
    const images = [];
    
    // Add hotel's main image if available
    if (hotel.imageUrl) {
      images.push(hotel.imageUrl);
    }
    
    // Add fallback images based on hotel category or use default luxury images
    const fallbackImages = [
      hotelImages.luxury1,
      hotelImages.luxury2,
      hotelImages.luxury3,
      hotelImages.business1,
      hotelImages.boutique1,
      hotelImages.resort1
    ];
    
    // Add fallback images to make at least 4 images total
    fallbackImages.forEach(img => {
      if (images.length < 6 && !images.includes(img)) {
        images.push(img);
      }
    });
    
    return images;
  };

  const imageGallery = getHotelImages();

  // Get amenity icon
  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': <Wifi className="w-4 h-4" />,
      'Pool': <Waves className="w-4 h-4" />,
      'Gym': <Dumbbell className="w-4 h-4" />,
      'Restaurant': <Utensils className="w-4 h-4" />,
      'Parking': <Car className="w-4 h-4" />,
      'Spa': <Heart className="w-4 h-4" />,
      'Room Service': <Coffee className="w-4 h-4" />,
      'Security': <Shield className="w-4 h-4" />,
      'TV': <Tv className="w-4 h-4" />,
      'AC': <Wind className="w-4 h-4" />,
      'Laundry': <Coffee className="w-4 h-4" />,
      'Conference Room': <Users className="w-4 h-4" />
    };
    return icons[amenity] || <Coffee className="w-4 h-4" />;
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    if (!bookingData.checkIn) {
      errors.checkIn = 'Check-in date is required';
    }
    
    if (!bookingData.checkOut) {
      errors.checkOut = 'Check-out date is required';
    }
    
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkInDate = new Date(bookingData.checkIn);
      const checkOutDate = new Date(bookingData.checkOut);
      
      if (checkInDate >= checkOutDate) {
        errors.checkOut = 'Check-out date must be after check-in date';
      }
      
      if (checkInDate < new Date().setHours(0, 0, 0, 0)) {
        errors.checkIn = 'Check-in date cannot be in the past';
      }
    }
    
    if (!bookingData.guests || bookingData.guests < 1) {
      errors.guests = 'At least 1 guest is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to make a booking');
      navigate('/login');
      return;
    }

    // Simple validation - just check if dates are selected
    if (!bookingData.checkIn || !bookingData.checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    
    if (checkInDate >= checkOutDate) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    if (checkInDate < new Date()) {
      toast.error('Check-in date cannot be in the past');
      return;
    }

    try {
      setIsBooking(true);
      
      // Calculate total price
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const roomPrices = {
        'standard': hotel.price,
        'deluxe': hotel.price * 1.5,
        'suite': hotel.price * 2
      };
      const totalPrice = nights * roomPrices[bookingData.roomType];

      // Create booking payload that matches backend expectations
      const bookingPayload = {
        hotelId: hotel.id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        roomType: bookingData.roomType,
        totalPrice: totalPrice, // Backend expects 'totalPrice', not 'totalAmount'
        paymentMethod: 'pending',
        specialRequests: bookingData.specialRequests || ''
      };

      console.log('Booking payload:', bookingPayload); // Debug log

      const response = await axios.post('http://localhost:5000/api/bookings', bookingPayload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Booking response:', response.data); // Debug log

      if (response.data.success) {
        toast.success('🎉 Booking confirmed! Redirecting to your bookings...', {
          duration: 4000,
        });
        
        // Reset form
        setBookingData({
          checkIn: '',
          checkOut: '',
          guests: 1,
          roomType: 'standard',
          specialRequests: ''
        });
        setFormErrors({});
        
        // Navigate to My Bookings page after successful booking
        setTimeout(() => {
          navigate('/my-bookings');
        }, 2000);
      } else {
        toast.error(response.data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        toast.error(error.response.data.message || 'Failed to create booking. Please try again.');
      } else {
        toast.error('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsBooking(false);
    }
  };

  // Handle input changes and clear errors
  const handleInputChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel Not Found</h2>
          <p className="text-gray-600 mb-6">The hotel you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/hotels')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

  // Calculate pricing for different room types
  const roomPrices = {
    'standard': hotel.price,
    'deluxe': hotel.price * 1.5,
    'suite': hotel.price * 2
  };

  // Calculate total price and nights
  const calculateTotal = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * roomPrices[bookingData.roomType] : 0;
  };

  const totalPrice = calculateTotal();
  const nights = bookingData.checkIn && bookingData.checkOut ? 
    Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/hotels')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Hotels
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={imageGallery[selectedImage] || hotelImages.luxury1}
                  alt={hotel.name}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.src = hotelImages.luxury1;
                  }}
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {imageGallery.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {imageGallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${hotel.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = hotelImages.luxury1;
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hotel Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{hotel.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{hotel.address}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(hotel.rating || 4.5) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600">
                        {hotel.rating || 4.5} ({hotel.reviews || Math.floor(Math.random() * 100) + 50} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">${hotel.price}</div>
                  <div className="text-gray-500">per night</div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{hotel.description}</p>

              {/* Amenities */}
              {hotel.amenities && hotel.amenities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {hotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        {getAmenityIcon(amenity)}
                        <span className="ml-3 text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {hotel.phone && (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{hotel.phone}</p>
                      </div>
                    </div>
                  )}
                  {hotel.email && (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{hotel.email}</p>
                      </div>
                    </div>
                  )}
                  {hotel.website && (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Globe className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <p className="font-medium">{hotel.website}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book Your Stay</h2>
              
              <form onSubmit={handleBooking} noValidate>
                {/* Check-in Date */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) => handleInputChange('checkIn', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Check-out Date */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => handleInputChange('checkOut', e.target.value)}
                      min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={bookingData.guests}
                      onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>
                          {num} Guest{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Room Type */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type
                  </label>
                  <select
                    value={bookingData.roomType}
                    onChange={(e) => handleInputChange('roomType', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="standard">Standard Room (${roomPrices.standard}/night)</option>
                    <option value="deluxe">Deluxe Room (${Math.round(roomPrices.deluxe)}/night)</option>
                    <option value="suite">Suite (${roomPrices.suite}/night)</option>
                  </select>
                </div>

                {/* Special Requests */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requests or preferences..."
                  />
                </div>

                {/* Pricing Summary */}
                {nights > 0 && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">{nights} night{nights > 1 ? 's' : ''}</span>
                      <span className="font-medium">${totalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-blue-600">${totalPrice}</span>
                    </div>
                  </div>
                )}

                {/* Book Now Button */}
                <button
                  type="submit"
                  disabled={isBooking || !user}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isBooking ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : !user ? (
                    'Please Login to Book'
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 inline mr-2" />
                      Book Now
                    </>
                  )}
                </button>

                {/* Login prompt for non-authenticated users */}
                {!user && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-center text-sm text-blue-800">
                      Please{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        login
                      </button>
                      {' '}to make a booking
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
