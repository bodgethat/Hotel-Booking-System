import { Link } from 'react-router-dom'
import { Star, MapPin, Wifi, Waves, Utensils } from 'lucide-react'

const HotelCard = ({ hotel }) => {
  // ⭐ Render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  // ✅ Amenity icon mapping
  const amenityIcons = {
    'Free WiFi': Wifi,
    'Swimming Pool': Waves,
    'Restaurant': Utensils,
  }

  // ✅ Get the correct icon or fallback
  const getAmenityIcon = (amenity) => {
    return amenityIcons[amenity] || null
  }

  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Hotel Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            hotel.images?.[0] ||
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
          }
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        {hotel.featured && (
          <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded px-2 py-1">
          <div className="flex items-center">{renderStars(hotel.rating)}</div>
        </div>
      </div>

      {/* Hotel Info */}
      <div className="card-body">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {hotel.name}
          </h3>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {hotel.city}, {hotel.country}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {hotel.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities?.slice(0, 3).map((amenity, index) => {
            const Icon = getAmenityIcon(amenity)
            return (
              <div
                key={index}
                className="flex items-center text-xs text-gray-500"
              >
                {Icon ? (
                  <Icon className="w-3 h-3 mr-1" />
                ) : (
                  <span className="mr-1">🏨</span>
                )}
                <span>{amenity}</span>
              </div>
            )
          })}
          {hotel.amenities?.length > 3 && (
            <span className="text-xs text-gray-500">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              NPR {hotel.averagePrice?.toLocaleString() || 'N/A'}
            </span>
            <span className="text-sm text-gray-500">/night</span>
          </div>
          <Link to={`/hotels/${hotel._id}`} className="btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HotelCard
