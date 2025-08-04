import api from './auth'

export const hotelsAPI = {
  // Get all hotels with optional filters
  getHotels: (params = {}) => api.get('/hotels', { params }),
  
  // Get featured hotels
  getFeaturedHotels: () => api.get('/hotels/featured'),
  
  // Get single hotel by ID
  getHotel: (id) => api.get(`/hotels/${id}`),
  
  // Search hotels
  searchHotels: (query) => api.get('/hotels/search', { params: { q: query } }),
  
  // Create hotel (admin only)
  createHotel: (hotelData) => api.post('/hotels', hotelData),
  
  // Update hotel (admin only)
  updateHotel: (id, hotelData) => api.put(`/hotels/${id}`, hotelData),
  
  // Delete hotel (admin only)
  deleteHotel: (id) => api.delete(`/hotels/${id}`),
} 