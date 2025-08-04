import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Utensils,
  Dumbbell,
  Trash2,
  Calendar,
  Users
} from 'lucide-react';
import { hotelImages } from '../assets/images/hotels';

const SavedBookings = () => {
  const [savedHotels, setSavedHotels] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
    loadSavedHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hotels');
      const data = await response.json();
      if (data.success) {
        setHotels(data.data);
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSavedHotels = () => {
    const saved = JSON.parse(localStorage.getItem('savedHotels') || '[]');
    setSavedHotels(saved);
  };

  const removeSavedHotel = (hotelId) => {
    const updated = savedHotels.filter(id => id !== hotelId);
    setSavedHotels(updated);
    localStorage.setItem('savedHotels', JSON.stringify(updated));
  };

  const clearAllSaved = () => {
    setSavedHotels([]);
    localStorage.removeItem('savedHotels');
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': Wifi,
      'Parking': Car,
      'Restaurant': Utensils,
      'Gym': Dumbbell,
      'Pool': '🏊‍♂️',
      'Spa': '💆‍♀️'
    };
    return icons[amenity] || '✨';
  };

  // Filter hotels to show only saved ones
  const savedHotelsList = hotels.filter(hotel => savedHotels.includes(hotel.id));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-white fill-current" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Your Saved Hotels
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Keep track of your favorite accommodations and book them later
            </p>
            {savedHotels.length > 0 && (
              <div className="flex justify-center space-x-4">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  {savedHotels.length} hotel{savedHotels.length !== 1 ? 's' : ''} saved
                </span>
                <button
                  onClick={clearAllSaved}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-colors duration-200 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {savedHotelsList.length > 0 ? (
          <>
            {/* Saved Hotels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedHotelsList.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={hotel.imageUrl || hotelImages.hotels[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeSavedHotel(hotel.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-200 group"
                    >
                      <Heart className="w-5 h-5 text-red-500 fill-current group-hover:scale-110 transition-transform duration-200" />
                    </button>
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
                        {hotel.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                        <Link to={`/hotels/${hotel.id}`}>
                          {hotel.name}
                        </Link>
                      </h3>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{hotel.city}, Nepal</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {hotel.description}
                    </p>
                    
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities?.slice(0, 3).map((amenity, index) => {
                        const IconComponent = getAmenityIcon(amenity);
                        return (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {typeof IconComponent === 'string' ? (
                              <span className="mr-1">{IconComponent}</span>
                            ) : (
                              <IconComponent className="w-3 h-3 mr-1" />
                            )}
                            {amenity}
                          </span>
                        );
                      })}
                      {hotel.amenities?.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{hotel.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          ${hotel.price}
                        </span>
                        <span className="text-gray-600 text-sm">/night</span>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          to={`/hotels/${hotel.id}`}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          View
                        </Link>
                        <Link
                          to={`/hotels/${hotel.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                        >
                          <Users className="w-4 h-4 mr-1" />
                          Book
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/hotels"
                  className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                >
                  <Heart className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="text-blue-600 font-medium">Find More Hotels</span>
                </Link>
                <Link
                  to="/bookings"
                  className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
                >
                  <Calendar className="w-5 h-5 mr-2 text-green-600" />
                  <span className="text-green-600 font-medium">View Bookings</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
                >
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  <span className="text-purple-600 font-medium">Dashboard</span>
                </Link>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-gray-300 mb-6">
              <Heart className="w-24 h-24 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Saved Hotels Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring our amazing hotels and save your favorites for easy booking later. 
              Just click the heart icon on any hotel you like!
            </p>
            <div className="space-y-4">
              <Link
                to="/hotels"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Heart className="w-5 h-5 mr-2" />
                Discover Hotels
              </Link>
              <div className="text-sm text-gray-500">
                <p>💡 Tip: Look for the heart icon on hotel cards to save them!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedBookings;
