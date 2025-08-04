import { Wifi, Waves, Utensils, Car, Dumbbell, Flower, Wine, Snowflake, Dog, Bell } from 'lucide-react'

export const amenityIcons = {
  'Free WiFi': Wifi,
  'Swimming Pool': Waves,
  'Restaurant': Utensils,
  'Parking': Car,
  'Gym': Dumbbell,
  'Spa': Flower,
  'Bar': Wine,
  'Air Conditioning': Snowflake,
  'Pet Friendly': Dog,
  'Room Service': Bell,
}

export const getAmenityIcon = (amenity) => {
  return amenityIcons[amenity] || null
}
