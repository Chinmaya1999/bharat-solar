import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Zap, Leaf, Menu, X, Search, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '../../pages/solor/solar-energy_8820867.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/products-services' },
  { name: 'Products', path: '/solar-products' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [celebrationBanners, setCelebrationBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch celebration banners
  // useEffect(() => {
  //   const fetchBanners = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/api/celebrationBanners/active');
  //       if (response.ok) {
  //         const data = await response.json();
  //         setCelebrationBanners(data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching banners:', error);
  //     }
  //   };

  //   fetchBanners();
  // }, []);

  // Auto-rotate banners
  useEffect(() => {
    if (celebrationBanners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => 
          prevIndex === celebrationBanners.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change banner every 5 seconds

      return () => clearInterval(interval);
    }
  }, [celebrationBanners.length]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // navigate(`/search?query=${searchQuery}`) if search page exists
    }
  };

  const closeBanner = (bannerId) => {
    setCelebrationBanners(prev => prev.filter(banner => banner._id !== bannerId));
    // Also set a cookie/localStorage to not show this banner again for some time
    localStorage.setItem(`banner-${bannerId}-closed`, 'true');
  };

  return (
    <>
      {/* Celebration Banner */}
      <AnimatePresence>
        {celebrationBanners.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 overflow-hidden"
          >
            <div className="relative">
              <button 
                onClick={() => closeBanner(celebrationBanners[currentBannerIndex]._id)}
                className="absolute right-2 top-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                <XCircle className="h-4 w-4 text-amber-600" />
              </button>
              
              {/* <Link to={celebrationBanners[currentBannerIndex].link || '#'}>
                <motion.img
                  key={celebrationBanners[currentBannerIndex]._id}
                  src={`http://localhost:3001/${celebrationBanners[currentBannerIndex].path}`}
                  alt={celebrationBanners[currentBannerIndex].title}
                  className="w-full h-16 object-contain mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </Link> */}
              
              {/* Banner indicators */}
              {celebrationBanners.length > 1 && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {celebrationBanners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBannerIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentBannerIndex ? 'bg-amber-600' : 'bg-amber-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled || celebrationBanners.length > 0 ? 'bg-white shadow-lg py-2' : 'bg-white/90 py-4'
        }`}
        style={{ top: celebrationBanners.length > 0 ? 'auto' : 0 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Bharat Solar Solution Logo" 
                  className={`h-12 w-12 object-contain transition-transform duration-300 group-hover:rotate-12 ${
                    isScrolled ? 'h-10 w-10' : 'h-12 w-12'
                  }`}
                />
              </div>
              
              {/* Animated Text Section */}
              <div className="flex flex-col">
                <motion.span 
                  className={`font-bold tracking-tight whitespace-nowrap ${
                    isScrolled ? 'text-2xl' : 'text-2xl'
                  }`}
                >
                  <span className="bg-gradient-to-r from-orange-600 via-amber-300 to-green-600 bg-clip-text text-transparent drop-shadow-sm">
                    BHARAT SOLAR SOLUTION
                  </span>
                </motion.span>
              </div>
            </Link>

            {/* Desktop Navigation + Search */}
            <div className="hidden lg:flex items-center space-x-4">
              <nav className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      location.pathname === link.path 
                        ? 'text-blue-600' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.span 
                        layoutId="nav-underline"
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-48 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </form>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:bg-gray-100 rounded-full"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden"
              >
                <nav className="flex flex-col space-y-2 py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={toggleMobileMenu}
                      className={`px-4 py-3 text-base font-medium rounded-lg ${
                        location.pathname === link.path 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}

                  {/* Mobile Search Bar */}
                  <form onSubmit={handleSearch} className="relative px-4">
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </form>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};

export default Header;