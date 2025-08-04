import { useState } from 'react'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import 'react-datepicker/dist/react-datepicker.css'

const SearchForm = ({ onSearch, className = '' }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    const searchData = {
      city: data.city,
      checkIn: startDate ? startDate.toISOString().split('T')[0] : '',
      checkOut: endDate ? endDate.toISOString().split('T')[0] : '',
      guests: parseInt(data.guests) || 1
    }
    onSearch(searchData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            {...register('city', { required: 'City is required' })}
            type="text"
            placeholder="Where are you going?"
            className="input pl-10"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* Check-in Date */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            placeholderText="Check-in"
            className="input pl-10"
            dateFormat="MMM dd, yyyy"
          />
        </div>

        {/* Check-out Date */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            placeholderText="Check-out"
            className="input pl-10"
            dateFormat="MMM dd, yyyy"
          />
        </div>

        {/* Guests */}
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            {...register('guests', { required: 'Number of guests is required' })}
            className="input pl-10"
          >
            <option value="">Guests</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
          {errors.guests && (
            <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full btn-primary py-3 text-lg font-semibold"
        >
          <Search className="w-5 h-5 mr-2 inline" />
          Search Hotels
        </button>
      </div>
    </form>
  )
}

export default SearchForm 