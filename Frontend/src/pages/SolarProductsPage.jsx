import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sun,
  BatteryCharging,
  ChevronRight,
  Filter,
  Grid,
  List,
  Star,
  CheckCircle,
  Shield,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } },
};

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'residential', name: 'Residential' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'Water Pumps', name: 'Water Pumps' },
  { id: 'Street Lights', name: 'Street Lights' },
  { id: 'Inverters', name: 'Inverters' },
  { id: 'Heaters', name: 'Heaters' },
  { id: 'EV Chargers', name: 'EV Chargers' }

];

const SolarProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = selectedCategory === 'all'
        ? 'https://api.bharatsolarsolution.com/api/products'
        : `https://api.bharatsolarsolution.com/api/products?category=${selectedCategory}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center text-destructive">
          <h2 className="text-2xl font-bold mb-4">Error Loading Products</h2>
          <p className="mb-4">{error}</p>
          <Button onClick={fetchProducts}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Hero Section */}
      <motion.section
        className="text-center mb-16"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-4" variants={slideUp(0)}>
          Premium <span className="gradient-text">Solar Products</span>
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" variants={slideUp(0.2)}>
          Discover our range of high-efficiency solar panels designed for residential, commercial, and industrial applications.
        </motion.p>
      </motion.section>

      {/* Category Filters */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Filter by Category:</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Products Grid */}
      <motion.section
        className="mb-16"
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              {selectedCategory === 'all'
                ? 'There are no products available at the moment.'
                : `There are no products in the ${selectedCategory} category.`}
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id || product.id}
                variants={slideUp(index * 0.1)}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="overflow-hidden">
                    <img
                      src={`https://api.bharatsolarsolution.com/${product.image.replace(/\\/g, "/")}`}
                      alt={product.alt || product.title}
                      className="w-55 h-30 object-contain"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{product.title}</CardTitle>
                      <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {product.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Power Output:</span>
                        <p className="text-muted-foreground">{product.specifications?.power}</p>
                      </div>
                      <div>
                        <span className="font-medium">Efficiency:</span>
                        <p className="text-muted-foreground">{product.specifications?.efficiency}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link to={`/quote-request?product=${product._id || product.id}`} className="w-full">
                      <Button className="w-full bg-gradient-to-r from-primary to-yellow-400 hover:from-primary/90 hover:to-yellow-400/90 text-primary-foreground">
                        Request Quote <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id || product.id}
                variants={slideUp(index * 0.1)}
                whileHover={{ y: -2 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={product.image}
                        alt={product.alt}
                        className="w-full h-60 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl">{product.title}</CardTitle>
                          <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                        </div>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Key Features:</h4>
                            <ul className="space-y-1">
                              {product.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Specifications:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium">Power Output:</span>
                                <span className="text-muted-foreground">{product.specifications?.power}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Efficiency:</span>
                                <span className="text-muted-foreground">{product.specifications?.efficiency}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Dimensions:</span>
                                <span className="text-muted-foreground">{product.specifications?.dimensions}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Weight:</span>
                                <span className="text-muted-foreground">{product.specifications?.weight}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/quote-request?product=${product._id || product.id}`} className="w-full">
                          <Button className="w-full bg-gradient-to-r from-primary to-yellow-400 hover:from-primary/90 hover:to-yellow-400/90 text-primary-foreground">
                            Request Quote <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="py-12 bg-muted/30 rounded-2xl mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Our Solar Products?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Our solar solutions are designed to deliver maximum efficiency, durability, and return on investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
          <motion.div
            className="text-center"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">25-Year Performance Warranty</h3>
            <p className="text-muted-foreground">
              Industry-leading warranty that guarantees your panels will perform at 85% capacity or more after 25 years.
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sun className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">High Efficiency Rates</h3>
            <p className="text-muted-foreground">
              Our panels convert more sunlight into electricity, maximizing energy production even in limited spaces.
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BatteryCharging className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Durability & Reliability</h3>
            <p className="text-muted-foreground">
              Engineered to withstand extreme weather conditions, from hailstorms to high winds and heavy snow loads.
            </p>
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
};

export default SolarProductsPage;