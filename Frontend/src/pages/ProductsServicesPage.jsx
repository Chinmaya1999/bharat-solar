
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sun, BatteryCharging, HardHat, Wrench, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      <motion.section
        className="text-center"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-4" variants={slideUp(0)}>
          Our <span className="gradient-text">Products & Services</span>
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" variants={slideUp(0.2)}>
          Discover our range of high-quality solar products and expert services designed to meet your energy needs.
        </motion.p>
      </motion.section>

      {/* Products Section */}
      <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Our <span className="text-primary">Products</span></h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div key={product.id} variants={slideUp(index * 0.1)}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                <img  className="w-full h-56 object-cover" alt={product.alt} src="https://images.unsplash.com/photo-1671376354106-d8d21e55dddd" />
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <product.icon className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-2xl">{product.title}</CardTitle>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-sm">
                    {product.details.map(detail => (
                      <li key={detail.label} className="flex justify-between">
                        <span className="font-medium text-foreground">{detail.label}:</span>
                        <span className="text-muted-foreground text-right">{detail.value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to={`/quote-request?product=${product.id}`} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-primary to-yellow-400 hover:from-primary/90 hover:to-yellow-400/90 text-primary-foreground">
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
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Our <span className="text-secondary">Services</span></h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div key={service.id} variants={slideUp(index * 0.15)}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                 <img  className="w-full h-56 object-cover" alt={service.alt} src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                <CardHeader>
                   <div className="flex items-center mb-2">
                    <service.icon className="h-8 w-8 text-secondary mr-3" />
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h4 className="font-semibold mb-2 text-foreground">Includes:</h4>
                  <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
                    {service.categories.map(cat => <li key={cat}>{cat}</li>)}
                  </ul>
                </CardContent>
                 <CardFooter>
                  <Link to="/contact" className="w-full">
                    <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
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
  );
};

export default ProductsServicesPage;
