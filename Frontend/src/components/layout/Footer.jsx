
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Sun } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Sun className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Bharat Solar Solution</span>
            </Link>
            <p className="text-sm">
              Powering your future with clean, reliable solar energy solutions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/privency-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/gallery" className="hover:text-primary transition-colors">gallery</Link></li>
              <li><Link to="/career" className="hover:text-primary transition-colors">Career</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li> 7Q39+8X9, Shreekhetra Vihar, Khandagiri, Bhubaneswar, Shankarpur, Odisha 751019</li>
              <li>Phone: 7377899573</li>
              <li>Email: saiadityabehera@bharatsolarsolution.com</li>
             
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={24} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={24} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={24} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin size={24} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Youtube size={24} /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-secondary-foreground/30 pt-8 text-center">
          <p className="text-sm">
            &copy; {currentYear} Bharat Solar Solution. All rights reserved.
          </p>
          <p className="text-xs mt-1">
            Website by chinmaya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
