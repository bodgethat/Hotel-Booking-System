import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('MyBookings component mounted');
    console.log('Current user:', user);
    
    if (!user) {
      console.log('User not authenticated, redirecting to login');
      navigate('/login');
      return;
    }
    
    fetchMyBookings();
  }, [user, navigate]);

  const fetchMyBookings = async () => {
    try {
      setIsLoading(true);
      console.log('=== FETCHING BOOKINGS START ===');
      console.log('User ID:', user?.id);
      console.log('Auth token exists:', !!localStorage.getItem('token'));
      
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('API Response:', response.data);
      console.log('Bookings received:', response.data.data);
      console.log('abcd')

      if (response.data.success) {
        setBookings(response.data.data || []);
        console.log('Bookings set in state:', response.data.data);
      } else {
        console.error('API returned success: false');
        toast.error('Failed to fetch your bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load your bookings');
    } finally {
      setIsLoading(false);
      console.log('=== FETCHING BOOKINGS END ===');
    }
  };

  console.log('Rendering MyBookings component');
  console.log('IsLoading:', isLoading);
  console.log('Bookings count:', bookings.length);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Hotel Bookings</h1>
          <p className="text-gray-600 mt-2">
            Welcome {user?.name}! Here are your hotel reservations.
          </p>
        </div>

        {/* Debug Info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Debug Information:</h3>
          <p className="text-blue-700">User: {user?.name} ({user?.email})</p>
          <p className="text-blue-700">User ID: {user?.id}</p>
          <p className="text-blue-700">Bookings Found: {bookings.length}</p>
          <p className="text-blue-700">Auth Token: {localStorage.getItem('token') ? 'Present' : 'Missing'}</p>
        </div>

        {/* Stats */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Booking Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{bookings.length}</div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div className="text-sm text-gray-600">Confirmed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ${bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              You haven't made any hotel bookings yet, or there might be an issue loading them.
            </p>
            <button
              onClick={() => navigate('/hotels')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Hotels
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Booking Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {booking.hotelName || `Hotel #${booking.hotelId}`}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Booking ID: #{booking.id} • Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-semibold">{new Date(booking.checkIn).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-semibold">{new Date(booking.checkOut).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-semibold">{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-semibold text-blue-600">${booking.totalAmount}</p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Room Type</p>
                    <p className="font-semibold capitalize">{booking.roomType}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Nights</p>
                    <p className="font-semibold">{booking.nights}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Payment</p>
                    <p className="font-semibold capitalize">{booking.paymentMethod}</p>
                  </div>
                </div>

                {/* Special Requests */}
                {booking.specialRequests && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Special Requests</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-gray-700">{booking.specialRequests}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate(`/hotels/${booking.hotelId}`)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View Hotel
                    </button>
                    
                    {booking.status === 'confirmed' && new Date(booking.checkIn) > new Date() && (
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to cancel this booking?')) {
                            // Cancel booking logic here
                            toast.success('Booking cancellation feature coming soon!');
                          }
                        }}
                        className="px-4 py-2 border border-red-300 rounded-md text-red-700 bg-white hover:bg-red-50"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Guest: {booking.guestName || user?.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
