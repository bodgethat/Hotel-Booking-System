// Simple in-memory hotel storage for demo (replace with database in production)
const hotels = [
  {
    id: 1,
    name: "Pokhara Lakeside Resort",
    city: "Pokhara",
    address: "Lakeside Road, Pokhara, Nepal",
    price: 120,
    rating: 4.8,
    category: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    amenities: ["Pool", "Spa", "Restaurant", "WiFi", "Parking", "Gym"],
    description: "Experience luxury at its finest with our stunning lakeside resort offering panoramic mountain views.",
    phone: "+977-61-123456",
    email: "info@pokharalakeside.com",
    website: "www.pokharalakeside.com",
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 2,
    name: "Kathmandu Heritage Hotel",
    city: "Kathmandu",
    address: "Thamel, Kathmandu, Nepal",
    price: 85,
    rating: 4.6,
    category: "heritage",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    amenities: ["Restaurant", "WiFi", "Parking", "Gym", "Laundry"],
    description: "Historic heritage hotel in the heart of Kathmandu's cultural district with traditional Newari architecture.",
    phone: "+977-1-987654",
    email: "info@kathmanduheritage.com",
    website: "www.kathmanduheritage.com",
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 3,
    name: "Simara Valley Inn",
    city: "Simara",
    address: "Main Road, Simara, Nepal",
    price: 65,
    rating: 4.4,
    category: "business",
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking", "Conference Room"],
    description: "Modern business hotel perfect for corporate travelers with state-of-the-art facilities.",
    phone: "+977-51-123456",
    email: "info@simaravalley.com",
    website: "www.simaravalley.com",
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 4,
    name: "Himalayan Hostel",
    city: "Pokhara",
    address: "Lakeside, Pokhara, Nepal",
    price: 25,
    rating: 4.2,
    category: "hostel",
    imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
    amenities: ["WiFi", "Shared Kitchen", "Common Area", "Lockers"],
    description: "Budget-friendly hostel with mountain views and friendly atmosphere, perfect for backpackers.",
    phone: "+977-61-654321",
    email: "info@himalayanhostel.com",
    website: "www.himalayanhostel.com",
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 5,
    name: "Mountain View Resort",
    city: "Nagarkot",
    address: "Nagarkot Hill Station, Nepal",
    price: 150,
    rating: 4.9,
    category: "resort",
    imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
    amenities: ["Pool", "Spa", "Restaurant", "Hiking", "WiFi", "Mountain Views"],
    description: "Exclusive mountain resort with panoramic Himalayan views and world-class amenities.",
    phone: "+977-1-456789",
    email: "info@mountainviewresort.com",
    website: "www.mountainviewresort.com",
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 6,
    name: "Eco Lodge Chitwan",
    city: "Chitwan",
    address: "Chitwan National Park, Nepal",
    price: 95,
    rating: 4.7,
    category: "eco",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    amenities: ["Restaurant", "WiFi", "Nature Tours", "Bird Watching"],
    description: "Sustainable eco-lodge in the heart of Chitwan National Park, perfect for nature lovers.",
    phone: "+977-56-123456",
    email: "info@ecolodgechitwan.com",
    website: "www.ecolodgechitwan.com",
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 7,
    name: "Family Paradise Hotel",
    city: "Kathmandu",
    address: "Durbar Marg, Kathmandu, Nepal",
    price: 110,
    rating: 4.5,
    category: "family",
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
    amenities: ["Pool", "Kids Club", "Restaurant", "WiFi", "Parking", "Family Rooms"],
    description: "Family-friendly hotel with spacious rooms and activities for children of all ages.",
    phone: "+977-1-234567",
    email: "info@familyparadise.com",
    website: "www.familyparadise.com",
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 8,
    name: "Romantic Retreat Dhulikhel",
    city: "Dhulikhel",
    address: "Dhulikhel Hill Station, Nepal",
    price: 130,
    rating: 4.8,
    category: "romantic",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    amenities: ["Spa", "Restaurant", "WiFi", "Couples Massage", "Sunset Views"],
    description: "Intimate romantic retreat with breathtaking sunrise views over the Himalayas.",
    phone: "+977-11-987654",
    email: "info@romanticretreat.com",
    website: "www.romanticretreat.com",
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 9,
    name: "Budget Inn Thamel",
    city: "Kathmandu",
    address: "Thamel, Kathmandu, Nepal",
    price: 35,
    rating: 4.1,
    category: "budget",
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
    amenities: ["WiFi", "24/7 Reception", "Laundry", "Tour Desk"],
    description: "Clean and comfortable budget accommodation in the heart of Thamel tourist district.",
    phone: "+977-1-345678",
    email: "info@budgetinnthamel.com",
    website: "www.budgetinnthamel.com",
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 10,
    name: "Boutique Hotel Patan",
    city: "Lalitpur",
    address: "Patan Durbar Square, Lalitpur, Nepal",
    price: 90,
    rating: 4.6,
    category: "boutique",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
    amenities: ["Restaurant", "WiFi", "Art Gallery", "Cultural Tours"],
    description: "Charming boutique hotel showcasing traditional Nepali art and culture near Patan Durbar Square.",
    phone: "+977-1-456789",
    email: "info@boutiquepatan.com",
    website: "www.boutiquepatan.com",
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 11,
    name: "Lakeside Mountain Lodge",
    city: "Pokhara",
    address: "Phewa Lake, Pokhara, Nepal",
    price: 140,
    rating: 4.7,
    category: "lakeside",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    amenities: ["Lake Views", "Restaurant", "WiFi", "Boat Rental", "Fishing"],
    description: "Serene lakeside lodge offering direct access to Phewa Lake with stunning mountain reflections.",
    phone: "+977-61-789012",
    email: "info@lakesidelodge.com",
    website: "www.lakesidelodge.com",
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 12,
    name: "Himalayan Mountain Hotel",
    city: "Namche Bazaar",
    address: "Namche Bazaar, Everest Region, Nepal",
    price: 80,
    rating: 4.4,
    category: "mountain",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    amenities: ["Mountain Views", "Restaurant", "WiFi", "Trekking Gear", "Oxygen"],
    description: "High-altitude mountain hotel serving as the perfect base for Everest region trekking adventures.",
    phone: "+977-38-123456",
    email: "info@himalayamountain.com",
    website: "www.himalayamountain.com",
    isActive: true,
    createdAt: new Date()
  }
];

/**
 * @desc    Get all hotels
 * @route   GET /api/hotels
 * @access  Public
 */
export const getAllHotels = async (req, res) => {
  try {
    const { city, category, minPrice, maxPrice, search, sortBy } = req.query;
    
    let filteredHotels = [...hotels];

    // Filter by city
    if (city) {
      filteredHotels = filteredHotels.filter(hotel => 
        hotel.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      filteredHotels = filteredHotels.filter(hotel => 
        hotel.category === category
      );
    }

    // Filter by price range
    if (minPrice) {
      filteredHotels = filteredHotels.filter(hotel => 
        hotel.price >= parseInt(minPrice)
      );
    }
    if (maxPrice) {
      filteredHotels = filteredHotels.filter(hotel => 
        hotel.price <= parseInt(maxPrice)
      );
    }

    // Search by name, city, or description
    if (search) {
      filteredHotels = filteredHotels.filter(hotel => 
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.city.toLowerCase().includes(search.toLowerCase()) ||
        hotel.description.toLowerCase().includes(search.toLowerCase()) ||
        hotel.amenities.some(amenity => 
          amenity.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // Sort hotels
    if (sortBy) {
      filteredHotels.sort((a, b) => {
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
    }

    res.json({
      success: true,
      count: filteredHotels.length,
      data: filteredHotels,
      categories: getHotelCategories()
    });
  } catch (error) {
    console.error('Get hotels error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hotels'
    });
  }
};

/**
 * @desc    Get hotel categories with counts
 * @route   GET /api/hotels/categories
 * @access  Public
 */
export const getHotelCategories = () => {
  const categories = {};
  
  hotels.forEach(hotel => {
    if (categories[hotel.category]) {
      categories[hotel.category]++;
    } else {
      categories[hotel.category] = 1;
    }
  });

  return Object.entries(categories).map(([category, count]) => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1) + ' Hotels',
    count
  }));
};

/**
 * @desc    Get single hotel
 * @route   GET /api/hotels/:id
 * @access  Public
 */
export const getHotel = async (req, res) => {
  try {
    const hotel = hotels.find(h => h.id === parseInt(req.params.id));
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.json({
      success: true,
      data: hotel
    });
  } catch (error) {
    console.error('Get hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hotel'
    });
  }
};

/**
 * @desc    Create new hotel
 * @route   POST /api/hotels
 * @access  Private/Admin
 */
export const createHotel = async (req, res) => {
  try {
    const newHotel = {
      id: hotels.length + 1,
      ...req.body,
      isActive: true,
      createdAt: new Date()
    };

    hotels.push(newHotel);

    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      data: newHotel
    });
  } catch (error) {
    console.error('Create hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating hotel'
    });
  }
};

/**
 * @desc    Update hotel
 * @route   PUT /api/hotels/:id
 * @access  Private/Admin
 */
export const updateHotel = async (req, res) => {
  try {
    const hotelIndex = hotels.findIndex(h => h.id === parseInt(req.params.id));
    
    if (hotelIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    hotels[hotelIndex] = {
      ...hotels[hotelIndex],
      ...req.body,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      message: 'Hotel updated successfully',
      data: hotels[hotelIndex]
    });
  } catch (error) {
    console.error('Update hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating hotel'
    });
  }
};

/**
 * @desc    Delete hotel
 * @route   DELETE /api/hotels/:id
 * @access  Private/Admin
 */
export const deleteHotel = async (req, res) => {
  try {
    const hotelIndex = hotels.findIndex(h => h.id === parseInt(req.params.id));
    
    if (hotelIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    hotels.splice(hotelIndex, 1);

    res.json({
      success: true,
      message: 'Hotel deleted successfully'
    });
  } catch (error) {
    console.error('Delete hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting hotel'
    });
  }
};

// Export the hotels array for use in other controllers
export { hotels };
