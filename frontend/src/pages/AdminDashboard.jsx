import { useAuth } from '../contexts/AuthContext'

const AdminDashboard = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome, {user?.name}! Manage your hotel booking system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold text-primary-600">25</h3>
              <p className="text-gray-600">Total Hotels</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold text-green-600">150</h3>
              <p className="text-gray-600">Total Bookings</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold text-blue-600">1,250</h3>
              <p className="text-gray-600">Total Users</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold text-purple-600">NPR 2.5M</h3>
              <p className="text-gray-600">Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="text-xl font-semibold mb-4">Admin Features</h2>
            <p className="text-gray-600">
              This is a placeholder for the admin dashboard. In a complete implementation, 
              this would include:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
              <li>Hotel management (add, edit, delete hotels)</li>
              <li>Room management and availability</li>
              <li>Booking management and status updates</li>
              <li>User management and role assignments</li>
              <li>Payment processing and refunds</li>
              <li>Analytics and reporting</li>
              <li>System settings and configuration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard 