import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Utensils,
  Dumbbell,
  Heart,
  HeartOff
} from 'lucide-react';
import { hotelImages } from '../assets/images/hotels';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [savedHotels, setSavedHotels] = useState([]);

  // Comprehensive hotel categories
  const categories = [
    { value: 'all', label: 'All Categories', count: 0 },
    { value: 'luxury', label: 'Luxury Hotels', count: 0 },
    { value: 'boutique', label: 'Boutique Hotels', count: 0 },
    { value: 'business', label: 'Business Hotels', count: 0 },
    { value: 'resort', label: 'Resorts', count: 0 },
    { value: 'hostel', label: 'Hostels', count: 0 },
    { value: 'budget', label: 'Budget Hotels', count: 0 },
    { value: 'family', label: 'Family Hotels', count: 0 },
    { value: 'romantic', label: 'Romantic Hotels', count: 0 },
    { value: 'eco', label: 'Eco Hotels', count: 0 },
    { value: 'heritage', label: 'Heritage Hotels', count: 0 },
    { value: 'mountain', label: 'Mountain Hotels', count: 0 },
    { value: 'lakeside', label: 'Lakeside Hotels', count: 0 }
  ];

  useEffect(() => {
    fetchHotels();
    loadSavedHotels();
  }, []);

  useEffect(() => {
    filterHotels();
  }, [hotels, searchTerm, selectedCategory, priceRange, sortBy]);

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

  const toggleSaveHotel = (hotelId) => {
    const saved = [...savedHotels];
    const index = saved.indexOf(hotelId);
    
    if (index > -1) {
      saved.splice(index, 1);
    } else {
      saved.push(hotelId);
    }
    
    setSavedHotels(saved);
    localStorage.setItem('savedHotels', JSON.stringify(saved));
  };

  const filterHotels = () => {
    let filtered = [...hotels];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(hotel => hotel.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(hotel => 
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredHotels(filtered);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              🏨 Discover Amazing Hotels
            </h1>
            <p className="text-xl mb-8">
              Find the perfect accommodation for your stay in Nepal's most beautiful destinations
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hotels by name or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-3 text-blue-600"
                      />
                      <span className="text-sm">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range (per night)</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating (High to Low)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Hotels List */}
          <div className="lg:w-3/4">
            {/* View Controls */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Found {filteredHotels.length} hotels
                </h2>
                <p className="text-gray-600">Best accommodations for your stay</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Hotels Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={viewMode === 'list' ? 'w-1/3' : 'w-full'}>
                    <div className="relative h-48">
                      <img
                        src={hotel.imageUrl || hotelImages.hotels[0]}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => toggleSaveHotel(hotel.id)}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
                      >
                        {savedHotels.includes(hotel.id) ? (
                          <Heart className="w-5 h-5 text-red-500 fill-current" />
                        ) : (
                          <HeartOff className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
                          {hotel.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-6 ${viewMode === 'list' ? 'w-2/3' : 'w-full'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                        <Link to={`/hotels/${hotel.id}`}>
                          {hotel.name}
                        </Link>
                      </h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                      </div>
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
                      {hotel.amenities?.slice(0, 4).map((amenity, index) => {
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
                      {hotel.amenities?.length > 4 && (
                        <span className="text-xs text-gray-500">
                          +{hotel.amenities.length - 4} more
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
                      <Link
                        to={`/hotels/${hotel.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
