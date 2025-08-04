import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const AuthTest = () => {
  const { user, login, register, logout, loading } = useAuth()
  const [testEmail, setTestEmail] = useState('test@example.com')
  const [testPassword, setTestPassword] = useState('password123')
  const [testName, setTestName] = useState('Test User')

  const handleTestRegister = async () => {
    const result = await register({
      name: testName,
      email: testEmail,
      password: testPassword,
      phone: '+977-1-234567',
      address: 'Kathmandu, Nepal'
    })
    console.log('Register result:', result)
  }

  const handleTestLogin = async () => {
    const result = await login(testEmail, testPassword)
    console.log('Login result:', result)
  }

  const handleTestLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Authentication Test</h1>
        
        {user ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">✅ Logged In</h2>
              <p className="text-green-700">Name: {user.name}</p>
              <p className="text-green-700">Email: {user.email}</p>
              <p className="text-green-700">Role: {user.role}</p>
            </div>
            <button
              onClick={handleTestLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-red-800 mb-2">❌ Not Logged In</h2>
              <p className="text-red-700">Please register or login to test authentication</p>
            </div>
            
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleTestRegister}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Test Register'}
              </button>
              <button
                onClick={handleTestLogin}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Test Login'}
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Demo Credentials:</h3>
          <p className="text-sm text-gray-600">User: demo@hotel.com / demo123</p>
          <p className="text-sm text-gray-600">Admin: admin@hotel.com / demo123</p>
        </div>
      </div>
    </div>
  )
}

export default AuthTest
