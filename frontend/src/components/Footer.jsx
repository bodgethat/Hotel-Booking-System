import { Link } from 'react-router-dom'
import { Hotel, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Heart, Star } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Hotel className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Kumar's Creation
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Experience luxury and comfort at its finest. Book your perfect stay with our comprehensive hotel booking platform featuring the best accommodations across Nepal.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/saved-bookings" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Saved Hotels
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <a href="tel:+9779821163469" className="text-gray-300 hover:text-white transition-colors duration-200">
                  📞 +977 9821163469
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a href="tel:+9779821163469" className="text-gray-300 hover:text-white transition-colors duration-200">
                  +977 9821163469
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:yadavkumar7123@gmail.com" className="text-gray-300 hover:text-white transition-colors duration-200">
                  yadavkumar7123@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-400" />
                About Kumar's Creation
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Kumar's Creation is your trusted partner for finding the perfect accommodation in Nepal. 
                We specialize in connecting travelers with exceptional hotels, from luxury resorts to budget-friendly hostels. 
                Our platform features comprehensive categories including heritage hotels, eco-lodges, mountain retreats, 
                and lakeside resorts across Nepal's most beautiful destinations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                Why Choose Us?
              </h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• 12+ Hotel Categories to suit every traveler</li>
                <li>• Curated selection of Nepal's finest accommodations</li>
                <li>• Easy booking with instant confirmation</li>
                <li>• Save your favorite hotels for future trips</li>
                <li>• 24/7 customer support</li>
                <li>• Best price guarantee</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            2024 Kumar's Creation. All rights reserved. Made with for travelers.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <a href="tel:+9779821163469" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Call Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer