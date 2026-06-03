import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Sun } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-orange-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-2 rounded-xl">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-orange-400 transition-all duration-300">Bharat Solar</span>
            </Link>
           <p className="text-sm text-gray-300 leading-relaxed">
              Clean energy solutions for a sustainable future. Powering India with solar innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Contact</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Gallery</Link></li>
              <li><Link to="/career" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Career</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-base font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Terms of Use</Link></li>
              <li><Link to="/admin" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Admin Login</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-base font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">Connect</h3>
            <div className="flex space-x-3 mb-4">
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-orange-500 p-2.5 rounded-xl transition-all duration-300 hover:scale-110" aria-label="Facebook">
                <Facebook size={18} className="text-white" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-orange-500 p-2.5 rounded-xl transition-all duration-300 hover:scale-110" aria-label="Twitter">
                <Twitter size={18} className="text-white" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-orange-500 p-2.5 rounded-xl transition-all duration-300 hover:scale-110" aria-label="Instagram">
                <Instagram size={18} className="text-white" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-orange-500 p-2.5 rounded-xl transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                <Linkedin size={18} className="text-white" />
              </a>
            </div>
            <p className="text-sm text-gray-300">
              Email: saiadityabehera@bharatsolarsolutions.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 Bharat Solar. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">Website by Chinmaya</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;