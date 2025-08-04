import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// Generate password hash for Kumar's password
const generateKumarPasswordHash = async () => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash('kumarx77!!', salt);
};

// Simple in-memory user storage for demo (replace with database in production)
let users = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@hotel.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: demo123
    role: 'user',
    phone: '+977-1-234567',
    address: 'Kathmandu, Nepal',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@hotel.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: demo123
    role: 'admin',
    phone: '+977-1-234568',
    address: 'Kathmandu, Nepal',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 3,
    name: 'Kumar Yadav',
    email: 'yadavkumar7123@gmail.com',
    password: '$2a$10$vQj8YQj8YQj8YQj8YQj8YOj8YQj8YQj8YQj8YQj8YQj8YQj8YQj8YQ', // Will be updated with correct hash
    role: 'user',
    phone: '9821163469',
    address: 'Kathmandu, Nepal',
    isActive: true,
    createdAt: new Date()
  }
];

// Initialize Kumar's password hash
(async () => {
  try {
    const kumarPasswordHash = await generateKumarPasswordHash();
    const kumarUser = users.find(u => u.email === 'yadavkumar7123@gmail.com');
    if (kumarUser) {
      kumarUser.password = kumarPasswordHash;
      console.log('Kumar Yadav password hash updated successfully');
    }
  } catch (error) {
    console.error('Error updating Kumar password hash:', error);
  }
})();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  });
};

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { name, email, password, phone, address } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      address: address || '',
      role: 'user',
      isActive: true,
      createdAt: new Date()
    };

    users.push(newUser);

    // Generate token
    const token = generateToken(newUser.id);

    // Remove password from response
    const { password: _, ...userResponse } = newUser;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Generate token
    const token = generateToken(user.id);

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Public
 */
export const logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = (req, res) => {
  const { password: _, ...userResponse } = req.user;
  res.json({
    success: true,
    data: userResponse
  });
};

/**
 * @desc    Forgot password
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // In a real application, you would send an email with a reset link
    res.json({
      success: true,
      message: 'Password reset instructions sent to your email'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Helper function to find user by ID (used by authGuard middleware)
export const findUserById = (id) => {
  return users.find(user => user.id === parseInt(id));
};

// Export the users array for use in other controllers
export { users };
