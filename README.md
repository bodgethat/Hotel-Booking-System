# Hotel Booking System

A full-stack hotel booking application built with React and Node.js, featuring modern UI, authentication, hotel browsing, and booking functionality.

## 🚀 Quick Start

### Option 1: Use the Automated Script (Recommended)
Simply double-click `start.bat` to automatically install dependencies and start both servers.

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
npm install
npm start
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔗 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🔐 Demo Credentials

### User Account
- **Email**: demo@hotel.com
- **Password**: demo123

### Admin Account
- **Email**: admin@hotel.com
- **Password**: demo123

## ✨ Features

### Frontend Features
- 🏠 **Beautiful Home Page** with hero section and featured hotels
- 🔐 **Login/Register Pages** with modern UI and validation
- 🏨 **Hotels Listing** with search, filters, and sorting
- 📱 **Hotel Details** with image gallery and booking form
- 💳 **Booking System** with date validation and price calculation
- 🎨 **Modern UI** with Tailwind CSS and responsive design

### Backend Features
- 🔒 **JWT Authentication** with secure login/register
- 🏨 **Hotel Management** with CRUD operations
- 📅 **Booking System** with validation and management
- 👑 **Admin Dashboard** with user and booking management
- 🛡️ **Security** with rate limiting and input validation
- 📊 **RESTful API** with proper error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **In-memory storage** (easily replaceable with database)

## 📁 Project Structure

```
Hotel Booking System/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── assets/          # Images and static assets
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx          # Main app component
│   └── package.json
├── backend/                 # Node.js backend
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── routes/              # API routes
│   ├── server.js            # Main server file
│   └── package.json
├── start.bat               # Windows startup script
└── README.md
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Hotels
- `GET /api/hotels` - Get all hotels (with filters)
- `GET /api/hotels/:id` - Get single hotel
- `POST /api/hotels` - Create hotel (admin only)
- `PUT /api/hotels/:id` - Update hotel (admin only)
- `DELETE /api/hotels/:id` - Delete hotel (admin only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get single booking
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/admin/all` - Get all bookings (admin only)

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## 🎯 Usage Guide

1. **Start the application** using `start.bat` or manual setup
2. **Register a new account** or use demo credentials
3. **Browse hotels** on the Hotels page with filters and search
4. **View hotel details** and check amenities, reviews, and pricing
5. **Make a booking** by selecting dates and room preferences
6. **Manage bookings** in your user dashboard
7. **Admin users** can manage hotels, bookings, and users

## 🔧 Development Notes

- The system currently uses **in-memory storage** for demo purposes
- For production, replace with a proper database (MongoDB, PostgreSQL, etc.)
- All backend files use **ES6 modules** for consistency
- Frontend uses modern React patterns with hooks and functional components
- **CORS** is configured to allow frontend-backend communication
- **Rate limiting** is implemented for API protection

## 🚀 Deployment

For production deployment:

1. Set up environment variables in `.env` files
2. Replace in-memory storage with a database
3. Configure proper CORS origins
4. Set up SSL certificates
5. Use PM2 or similar for process management
6. Set up reverse proxy with Nginx

## 📝 License

MIT License - feel free to use this project for learning and development.

---

**Happy Booking!** 🏨✨