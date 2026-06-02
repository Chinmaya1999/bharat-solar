
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sun, BatteryCharging, HardHat, Wrench, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } },
};

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const products = [
  {
    id: 'solar-panels',
    icon: Sun,
    title: 'Solar Panels',
    description: 'Harness the power of the sun with our high-efficiency solar panels. We offer a range of options to suit your energy needs and budget, including monocrystalline and polycrystalline types.',
    details: [
      { label: 'Types', value: 'Monocrystalline, Polycrystalline' },
      { label: 'Efficiency', value: 'Up to 22.5%' },
      { label: 'Warranty', value: '25-year performance warranty, 10-12 year product warranty' },
    ],
    image: 'Close up of solar panel cells',
    alt: 'Detailed view of solar panel surface'
  },
  {
    id: 'inverters',
    icon: BatteryCharging, 
    title: 'Inverters',
    description: 'Convert solar energy into usable electricity with our state-of-the-art inverters. Choose from on-grid, off-grid, and hybrid models for maximum flexibility.',
    details: [
      { label: 'Types', value: 'On-grid, Off-grid, Hybrid' },
      { label: 'Features', value: 'Smart monitoring, Grid-tie capability, High efficiency' },
      { label: 'Compatibility', value: 'Compatible with various panel types and battery systems' },
    ],
    image: 'Advanced solar inverter unit',
    alt: 'A modern solar inverter'
  },
  {
    id: 'batteries',
    icon: BatteryCharging,
    title: 'Energy Storage Batteries',
    description: 'Store excess solar energy for use during nighttime or power outages. Our range includes long-lasting lithium-ion and reliable lead-acid batteries.',
    details: [
      { label: 'Types', value: 'Lithium-ion, Lead-acid' },
      { label: 'Backup Time', value: 'Customizable based on capacity' },
      { label: 'Lifespan', value: 'Up to 15 years (Lithium-ion)' },
    ],
    image: 'Residential solar battery system',
    alt: 'A home battery storage unit'
  },
];

const services = [
  {
    id: 'installation',
    icon: HardHat,
    title: 'Installation Services',
    description: 'Professional and certified installation for residential, commercial, and industrial properties. Our experienced team ensures a safe and efficient setup.',
    categories: ['Residential', 'Commercial', 'Industrial'],
    image: 'Technicians installing solar panels on a roof',
    alt: 'Solar panel installation in progress'
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Maintenance & AMC',
    description: 'Keep your solar system performing optimally with our comprehensive maintenance services and Annual Maintenance Contracts (AMC).',
    categories: ['Regular Inspections', 'Cleaning Services', 'System Health Checks'],
    image: 'Technician maintaining a solar panel system',
    alt: 'Solar panel maintenance work'
  },
];

const ProductsServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Solar Products & Services - Bharat Solar Solution | Solar Panels, Inverters, Batteries & Installation</title>
        <meta name="description" content="Explore our range of high-quality solar products including solar panels, inverters, and batteries. Get professional solar installation services, maintenance, and AMC for residential, commercial, and industrial properties." />
        <meta name="keywords" content="solar products, solar panels, solar inverters, solar batteries, solar installation, solar maintenance, solar AMC, residential solar, commercial solar, industrial solar, solar services" />
        <link rel="canonical" href="https://bharatsolarsolution.com/products-services" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Solar Products & Services - Bharat Solar Solution" />
        <meta property="og:description" content="Explore our range of high-quality solar products including solar panels, inverters, and batteries. Get professional solar installation services." />
        <meta property="og:url" content="https://bharatsolarsolution.com/products-services" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="Solar Products & Services - Bharat Solar Solution" />
        <meta name="twitter:description" content="Explore our range of high-quality solar products including solar panels, inverters, and batteries. Get professional solar installation services." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20">
      <motion.section
        className="text-center"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4" variants={slideUp(0)}>
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Products & Services</span>
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto" variants={slideUp(0.2)}>
          Discover our range of high-quality solar products and expert services designed to meet your energy needs.
        </motion.p>
      </motion.section>

      {/* Products Section */}
      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }}>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Products</span></h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div key={product.id} variants={slideUp(index * 0.1)} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 rounded-3xl bg-white shadow-lg">
                <div className="relative overflow-hidden">
                  <img  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300" alt={product.alt} src="https://images.unsplash.com/photo-1671376354106-d8d21e55dddd" />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Premium
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-2.5 rounded-xl mr-3">
                      <product.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">{product.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3 text-sm">
                    {product.details.map(detail => (
                      <li key={detail.label} className="flex justify-between bg-gray-50 p-3 rounded-xl">
                        <span className="font-semibold text-gray-900">{detail.label}:</span>
                        <span className="text-gray-600 text-right font-medium">{detail.value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Link to={`/quote-request?product=${product.id}`} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Request Quote <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }}>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">Services</span></h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div key={service.id} variants={slideUp(index * 0.15)} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 rounded-3xl bg-white shadow-lg">
                 <div className="relative overflow-hidden">
                  <img  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300" alt={service.alt} src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Expert
                  </div>
                </div>
                <CardHeader className="pb-4">
                   <div className="flex items-center mb-3">
                    <div className="bg-gradient-to-r from-orange-500 to-blue-600 p-2.5 rounded-xl mr-3">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h4 className="font-bold mb-3 text-gray-900">Includes:</h4>
                  <ul className="space-y-2 text-sm">
                    {service.categories.map(cat => (
                      <li key={cat} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full mr-3" />
                        {cat}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                 <CardFooter className="pt-4">
                  <Link to="/contact" className="w-full">
                    <Button variant="outline" className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold rounded-xl transition-all duration-300">
                      Inquire About Services <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
    </>
  );
};

export default ProductsServicesPage;
