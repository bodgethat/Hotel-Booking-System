import { Link } from "react-router-dom";
import { hotelImages, backgroundImages } from "../assets/images/hotels";
import { Star, MapPin, Users, Calendar, Award, Shield } from "lucide-react";

const Home = () => {
  // Sample featured hotels with better categorization
  const hotels = [
    {
      id: 1,
      name: "Pokhara Lakeside Resort",
      location: "Pokhara, Nepal",
      image: hotelImages.luxury1,
      rating: 4.8,
      price: 120,
      category: "Luxury Resort",
      amenities: ["Pool", "Spa", "Restaurant", "WiFi"]
    },
    {
      id: 2,
      name: "Kathmandu Heritage Hotel",
      location: "Kathmandu, Nepal",
      image: hotelImages.boutique1,
      rating: 4.6,
      price: 85,
      category: "Heritage Hotel",
      amenities: ["Restaurant", "WiFi", "Parking", "Gym"]
    },
    {
      id: 3,
      name: "Simara Valley Inn",
      location: "Simara, Nepal",
      image: hotelImages.business1,
      rating: 4.4,
      price: 65,
      category: "Business Hotel",
      amenities: ["WiFi", "Restaurant", "Parking"]
    },
    {
      id: 4,
      name: "Himalayan Hostel",
      location: "Pokhara, Nepal",
      image: hotelImages.hostel1,
      rating: 4.2,
      price: 25,
      category: "Budget Hostel",
      amenities: ["WiFi", "Shared Kitchen", "Common Area"]
    },
    {
      id: 5,
      name: "Mountain View Resort",
      location: "Nagarkot, Nepal",
      image: hotelImages.resort1,
      rating: 4.9,
      price: 150,
      category: "Mountain Resort",
      amenities: ["Pool", "Spa", "Restaurant", "Hiking"]
    },
    {
      id: 6,
      name: "City Center Hostel",
      location: "Kathmandu, Nepal",
      image: hotelImages.hostel2,
      rating: 4.1,
      price: 20,
      category: "City Hostel",
      amenities: ["WiFi", "Laundry", "24/7 Reception"]
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure Booking",
      description: "Your bookings are protected with advanced security"
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Best Price Guarantee",
      description: "We guarantee the best prices for your stay"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for your needs"
    },
    {
      icon: <Calendar className="w-8 h-8 text-orange-600" />,
      title: "Easy Booking",
      description: "Simple and quick booking process in just a few clicks"
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('${backgroundImages.hero}')`,
          }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🏔️ Discover Nepal
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Find the perfect stay in <span className="text-blue-400 font-semibold">Pokhara</span>, 
            <span className="text-green-400 font-semibold"> Kathmandu</span> & 
            <span className="text-purple-400 font-semibold"> beyond</span>
          </p>
          <p className="text-lg mb-10 text-gray-300 max-w-2xl mx-auto">
            From luxury resorts to budget hostels, discover amazing accommodations 
            that match your travel style and budget.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/hotels"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
            >
              🏨 Explore Hotels
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
            >
              ✨ Join Now
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Why Choose Us?
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            We provide the best booking experience with unmatched service quality
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Hotels Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              🌟 Featured Accommodations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of the finest hotels and hostels across Nepal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {hotel.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{hotel.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{hotel.name}</h3>
                  <div className="flex items-center gap-1 mb-3 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        +{hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">${hotel.price}</span>
                      <span className="text-gray-500 text-sm">/night</span>
                    </div>
                    <Link
                      to={`/hotels/${hotel.id}`}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 font-semibold"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/hotels"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
            >
              View All Properties
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of travelers who trust us for their perfect stay in Nepal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
            >
              🚀 Get Started
            </Link>
            <Link
              to="/hotels"
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
            >
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
