import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Sun } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Main Footer Content - Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Brand Section */}
          <div className="space-y-2 co">
            <Link to="/" className="flex items-center space-x-2">
              <Sun className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Bharat Solar</span>
            </Link>
           <p
  className="text-xs text-muted-foreground"
  style={{ color: "white" }}
>
  Clean energy solutions for a sustainable future.
</p>
          </div>

          {/* Quick Links - Compact */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-primary">Quick Links</h3>
            <ul className="space-y-1 text-xs">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link to="/career" className="hover:text-primary transition-colors">Career</Link></li>
            </ul>
          </div>

          {/* Policies - Compact */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-primary">Policies</h3>
            <ul className="space-y-1 text-xs">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Use</Link></li>
              <li><Link to="/admin" className="hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Social & Contact - Compact */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-primary">Connect</h3>
            <div className="flex space-x-3 mb-2">
              <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
            <p className="text-xs text-muted-foreground" style={{ color: "white" }}>
              Email: saiadityabehera@bharatsolar.com
            </p>
          </div>
        </div>

        {/* Bottom Bar - Ultra Compact */}
        <div className="mt-6 pt-4 border-t border-secondary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground" style={{ color: "white" }}>
            <p>&copy; 2025 Bharat Solar. All rights reserved.</p>
            <p className="mt-1 sm:mt-0" style={{ color: "white" }}>Website by Chinmaya</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;