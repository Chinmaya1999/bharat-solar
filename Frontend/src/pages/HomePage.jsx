import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star, Zap, Sun, Battery, Home, HardHat, Clock, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  

  useEffect(() => {
  fetch("https://api.bharatsolarsolution.com/api/products")
    .then((res) => res.json())
    .then((data) => setProducts(data.products || []))
    .catch((err) => console.error("Error fetching products:", err));
}, []);
  // Fetch images from backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.bharatsolarsolution.com/api/images');
        if (response.ok) {
          const data = await response.json();
          setSliderImages(data.map(img => `https://api.bharatsolarsolution.com/${img.path}`));
        } else {
          // Fallback to default images if API fails
          setSliderImages([
            "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg",
            "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
            "https://images.unsplash.com/photo-1588854337236-6889d631faa8",
            "https://images.unsplash.com/photo-1566837946088-5f0e0b1b8e0f",
            "https://images.unsplash.com/photo-1581093196276-1a1b58b9a5e4",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a"
          ]);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        // Fallback to default images
        setSliderImages([
          "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg",
          "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
          "https://images.unsplash.com/photo-1588854337236-6889d631faa8",
          "https://images.unsplash.com/photo-1566837946088-5f0e0b1b8e0f",
          "https://images.unsplash.com/photo-1581093196276-1a1b58b9a5e4",
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a"
        ]);
      }
    };
    
    fetchImages();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (sliderImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderImages]);

  const nextSlide = () => {
    if (sliderImages.length === 0) return;
    setCurrentSlide(prev => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    if (sliderImages.length === 0) return;
    setCurrentSlide(prev => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Counter Component
  const Counter = ({ target, duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = target / (duration * 60);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }, [target, duration]);

    return <span>{count.toLocaleString()}</span>;
  };

  // Featured solar products
  const featuredProducts = [
    {
      id: 1,
      title: "Solar Panel 500W",
      tagline: "High efficiency monocrystalline",
      price: "₹22,999*",
      feature: "25-Year Warranty",
      badge: "BESTSELLER",
      description: "Efficiency: 21.3% | Temperature Coefficient: -0.34%/°C"
    },
    {
      id: 2,
      title: "Solar Inverter 5KVA",
      tagline: "Hybrid solar inverter with grid-tie",
      price: "₹49,999*",
      feature: "MPPT Technology",
      badge: "NEW"
    },
    {
      id: 3,
      title: "Solar Battery 150Ah",
      tagline: "Deep cycle tubular battery",
      price: "₹18,999*",
      feature: "1200+ Cycles",
      badge: "ECONOMY"
    }
  ];

  // Government schemes
  const governmentSchemes = [
    {
      name: "PM Surya Ghar Muft Bijli Yojana",
      description: "Central financial assistance for residential rooftop solar",
      subsidy: "Up to ₹78,000 subsidy",
      link: "https://pmsuryaghar.gov.in"
    },
    {
      name: "KUSUM Scheme",
      description: "Solar pumps and grid-connected solar power plants for farmers",
      subsidy: "30-50% subsidy",
      link: "https://mnre.gov.in/kusum"
    },
    {
      name: "Rooftop Solar Phase II",
      description: "Achieve 40 GW rooftop solar capacity by 2026",
      subsidy: "Up to 40% subsidy",
      link: "https://solarrooftop.gov.in"
    },
    {
      name: "Solar Park Scheme",
      description: "Development of solar parks and ultra mega solar power projects",
      subsidy: "₹20 lakh/MW or 30% of project cost",
      link: "https://mnre.gov.in/solar/solar-park"
    }
  ];

  // Category scroller
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

 
  const categorySolutions = [
    { name: "Residential Solar", icon: "https://cdn-icons-png.freepik.com/512/9189/9189832.png" },
    { name: "Commercial Solar", icon: "https://cdn-icons-png.flaticon.com/512/7702/7702064.png" },
    { name: "Solar Water Pumps", icon: "https://cdn.iconscout.com/icon/premium/png-256-thumb/solar-water-pump-8597408-6953266.png" },
    { name: "Solar Street Lights", icon: "https://cdn-icons-png.flaticon.com/256/9064/9064997.png" },
    { name: "Solar Inverters", icon: "https://cdn-icons-png.flaticon.com/512/8772/8772530.png" },
    { name: "Solar Batteries", icon: "https://www.svgrepo.com/show/35696/battery-charging-with-solar-panel.svg" },
    { name: "Solar Panels", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbivzlusXX2F0OSizqugOLOhNaRRskkRmudw&s" },
    { name: "Solar Heaters", icon: "https://png.pngtree.com/png-vector/20220720/ourmid/pngtree-industrial-solar-water-heater-color-icon-png-image_5353988.png" },
    { name: "EV Charging", icon: "https://www.svgrepo.com/show/308243/electric-car-charging-station-renewable-energy.svg" },
    { name: "Off-Grid Systems", icon: "https://png.pngtree.com/png-clipart/20190516/original/pngtree-vector-solar-panel-icon-png-image_4147157.jpg" },
    { name: "On-Grid Systems", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX6vcfVhyhmYvQ-FSz8LcYBP7l5svhgS-Z6g&s" },
    { name: "Hybrid Systems", icon: "https://www.pngfind.com/pngs/m/76-760186_zeroth-hybrid-solar-solar-panel-hybrid-system-hd.png" },


  ];
const handleCategoryClick = (categoryName) => {
    // Navigate to products page with category as parameter
    navigate(`/solar-products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="overflow-x-hidden bg-gray-50">
      {/* ===== Category Scroller with Arrows ===== */}
      <section className="py-8 bg-white relative">
        <div className="container px-4 relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Scrollable Categories */}
          <div ref={scrollRef} className="flex overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
            <div className="flex space-x-6">
              {categorySolutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeIn}
                  viewport={{ once: true }}
                  className="flex flex-col items-center min-w-[100px] flex-shrink-0"
                  onClick={() => handleCategoryClick(solution.name)}
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 p-3 shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={solution.icon}
                      alt={solution.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">
                    {solution.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </section>

      <style jsx>{`
        .animate-scroll-slow {
          animation: scroll 30s linear infinite;
          width: max-content;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% + 100vw));
          }
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Hero Slider Section */}
      <section className="relative h-[400px] text-white overflow-hidden">
        {/* Photo Slider */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {sliderImages.length > 0 && (
              <motion.img
                key={currentSlide}
                src={sliderImages[currentSlide]}
                alt={`Solar installation ${currentSlide + 1}`}
                className="w-full h-full object-cover brightness-[0.65] absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r  via-black/40 to-transparent" />

        {/* Content */}
        <div className="container h-full flex flex-col justify-center px-6 relative z-10">
          {/* <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <motion.div variants={slideUp} className="flex flex-wrap gap-4">
              <Link to="/quote">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-6 text-lg shadow-lg rounded-xl transition">
                  Get Free Consultation
                </Button>
              </Link>
              <Link to="/schemes">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium rounded-xl transition"
                >
                  Check Subsidy Eligibility
                </Button>
              </Link>
            </motion.div>
          </motion.div> */}
        </div>

        {/* Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition shadow-md"
          >
            <ChevronLeft className="h-7 w-7 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition shadow-md"
          >
            <ChevronRight className="h-7 w-7 text-white" />
          </button>
        </div>

        {/* Dots */}
        {sliderImages.length > 0 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {sliderImages.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "bg-yellow-400 scale-110 shadow-lg"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Government Schemes Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="container px-4">
          {/* Section Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={slideUp} className="text-3xl font-bold mb-4">
              Government <span className="text-blue-600">Solar Schemes</span>
            </motion.h2>
            <motion.p
              variants={slideUp}
              className="text-gray-600 max-w-2xl mx-auto text-lg"
            >
              Avail substantial subsidies and benefits on your solar installation
            </motion.p>
          </motion.div>

          {/* Scheme Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {governmentSchemes.map((scheme, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={slideUp}
                viewport={{ once: true }}
              >
                <Card className="relative h-full rounded-2xl overflow-hidden border border-blue-100 shadow-md hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white/80 via-blue-50/60 to-white/80 backdrop-blur-lg">
                  {/* Accent strip */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-400 to-yellow-400"></div>

                  <CardHeader>
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4 shadow-inner">
                      <ShieldCheck className="h-7 w-7 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {scheme.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="mb-4 text-gray-600">
                      {scheme.description}
                    </CardDescription>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full shadow-sm">
                        {scheme.subsidy}
                      </span>
                      <a
                        href={scheme.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-blue-600 hover:underline"
                      >
                        Learn More →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
    <section className="py-12 bg-gray-50">
  <div className="container mx-auto px-4">
    {/* Title */}
    <div className="flex items-center justify-between mb-8">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-gray-900"
      >
        Featured Solar Products
      </motion.h2>
      <a
        href="/solar-products"
        className="text-blue-600 font-medium hover:underline text-sm"
      >
        View All Products →
      </a>
    </div>

    {/* Products Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.length > 0 ? (
        products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            {/* Product Image */}
            <div className="relative bg-gray-50 p-6 flex justify-center">
              <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full text-gray-900">
                {product.category}
              </span>
              <img
                src={`https://api.bharatsolarsolution.com/${product.image.replace(/\\/g, "/")}`}
                alt={product.alt || product.title}
                className="w-55 h-30 object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {product.title}
              </h3>
              <p className="text-sm text-teal-600 font-medium">
                {product.features?.[0] || product.description}
              </p>

              <div className="mt-auto">
                <p className="text-xl font-bold text-blue-600">{product.priceRange}</p>
                <Link to="/contact">
                <button className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                Contact Us
                </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No products available</p>
      )}
    </div>
  </div>
</section>


      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="container px-4 relative z-10">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              variants={slideUp} 
              className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900"
            >
              Why Choose <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">Solar Energy?</span>
            </motion.h2>
            <motion.p 
              variants={slideUp} 
              className="text-gray-600 max-w-2xl mx-auto text-lg"
            >
              Discover the numerous benefits of switching to solar power
            </motion.p>
          </motion.div>

          {/* Grid Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sun,
                title: "Reduce Electricity Bills",
                description: "Save up to 90% on your monthly electricity expenses",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: Battery,
                title: "Energy Independence",
                description: "Generate your own power and reduce grid dependency",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Home,
                title: "Increase Property Value",
                description: "Solar homes sell faster and at higher prices",
                gradient: "from-teal-500 to-green-500"
              },
              {
                icon: HardHat,
                title: "Low Maintenance",
                description: "Solar systems require minimal maintenance",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Clock,
                title: "Quick Payback",
                description: "Recoup your investment in 4-6 years typically",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Users,
                title: "Environment Friendly",
                description: "Reduce your carbon footprint significantly",
                gradient: "from-green-500 to-lime-500"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={slideUp}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 bg-white/80 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${benefit.gradient} shadow-md mb-4`}>
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{benefit.title}</h3>
                    {/* Description */}
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative Background Circles */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-52 h-52 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 via-white to-blue-50">
        <div className="container px-6 mx-auto">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.h2
              variants={slideUp}
              className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
            >
              Our Simple <span className="text-blue-600">4-Step Process</span>
            </motion.h2>
            <motion.p
              variants={slideUp}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              From consultation to installation, we make going solar effortless.
            </motion.p>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Vertical line in center */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-200 via-blue-100 to-transparent transform -translate-x-1/2" />

            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              {[
                {
                  step: "1",
                  title: "Site Assessment",
                  description: "Our experts evaluate your property for solar potential.",
                  icon: Users,
                },
                {
                  step: "2",
                  title: "Custom Design",
                  description: "We create a solar system tailored to your needs.",
                  icon: ShieldCheck,
                },
                {
                  step: "3",
                  title: "Approvals & Subsidy",
                  description: "We handle all paperwork and subsidy applications.",
                  icon: HardHat,
                },
                {
                  step: "4",
                  title: "Installation",
                  description: "Certified technicians install your solar system.",
                  icon: Zap,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial="hidden"
                  whileInView="visible"
                  variants={slideUp}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0
                      ? "md:flex-row-reverse md:text-right"
                      : "md:text-left"
                  }`}
                >
                  {/* Connector dot */}
                  <div
                    className={`hidden md:flex absolute ${
                      index % 2 === 0 ? "right-1/2 translate-x-6" : "left-1/2 -translate-x-6"
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow-md" />
                  </div>

                  {/* Step Icon & Number */}
                  <div
                    className={`flex flex-col items-center ${
                      index % 2 === 0 ? "md:items-end" : "md:items-start"
                    }`}
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg mb-4 relative">
                      <item.icon className="h-7 w-7" />
                      <span className="absolute -top-3 -right-3 bg-white text-blue-600 font-bold rounded-full w-7 h-7 flex items-center justify-center shadow">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 max-w-xs">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t /30 to-transparent" />
        </div>

        <div className="relative container px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {/* Stats Counter Row */}
            <motion.div
              variants={slideUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16"
            >
              {[
                { target: 2500, label: "Solar Installations" },
                { target: 3500, label: "Happy Customers" },
                { target: 15, label: "MW Clean Energy Generated" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition"
                >
                  <div className="text-5xl font-extrabold text-yellow-400 mb-2">
                    <Counter target={stat.target} duration={3} />{i === 2 ? " MW" : "+"}
                  </div>
                  <p className="text-blue-100 text-lg">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA Content */}
            <motion.h2
              variants={slideUp}
              className="text-3xl md:text-4xl font-extrabold mb-6 leading-snug"
            >
              Power Your Future with <span className="text-yellow-400">Solar Energy</span>
            </motion.h2>
            <motion.p
              variants={slideUp}
              className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-blue-100"
            >
              Get a free consultation today and discover how much you can save while making the planet greener.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={slideUp}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link to="/contact">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-yellow-400/50 transition-all duration-300">
                  Get Free Quote
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-6 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300"
                >
                  📞  Call Now: 7377899573
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;