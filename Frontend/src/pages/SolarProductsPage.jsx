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
  Loader2,
  Search,
  X,
  SlidersHorizontal
} from 'lucide-react';
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

const categoryOptions = [
  { id: 'all', name: 'All Categories' },
  { id: 'residential', name: 'Residential' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'industrial', name: 'Industrial' },
  { id: 'specialized', name: 'Specialized' }
];

const SolarProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedProductType, setSelectedProductType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCompanies();
    fetchProductTypes();
  }, [selectedCategory, selectedCompany, selectedProductType]);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery]);

  const filterProducts = () => {
    if (!searchQuery) {
      setFilteredProducts(products);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.company.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.productType && product.productType.toLowerCase().includes(query))
    );
    setFilteredProducts(filtered);
  };

  const fetchProductTypes = async () => {
    try {
      const response = await fetch('http://api.bharatsolarsolution.com/api/products/meta/product-types');
      if (response.ok) {
        const data = await response.json();
        setProductTypes(data || []);
      }
    } catch (err) {
      console.error('Error fetching product types:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedCompany !== 'all') params.append('company', selectedCompany);
      if (selectedProductType !== 'all') params.append('productType', selectedProductType);

      const url = `http://api.bharatsolarsolution.com/api/products?${params.toString()}`;

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

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://api.bharatsolarsolution.com/api/products/meta/companies');
      if (response.ok) {
        const data = await response.json();
        setCompanies(data || []);
      }
    } catch (err) {
      console.error('Error fetching companies:', err);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedCompany('all');
    setSelectedProductType('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedCompany !== 'all' || selectedProductType !== 'all' || searchQuery !== '';


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
    <>
      <Helmet>
        <title>Solar Products - Bharat Solar Solution | Buy Solar Panels, Inverters, Batteries Online</title>
        <meta name="description" content="Browse our premium solar products including high-efficiency solar panels, inverters, batteries, water pumps, street lights, and more. Best prices with 25-year warranty. Shop online for residential and commercial solar systems." />
        <meta name="keywords" content="solar panels for sale, buy solar inverter, solar battery price, solar water pump, solar street light, solar heater, EV charger, residential solar products, commercial solar products, solar equipment India" />
        <link rel="canonical" href="https://bharatsolarsolution.com/solar-products" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Solar Products - Bharat Solar Solution" />
        <meta property="og:description" content="Browse our premium solar products including high-efficiency solar panels, inverters, batteries, water pumps, street lights, and more. Best prices with 25-year warranty." />
        <meta property="og:url" content="https://bharatsolarsolution.com/solar-products" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="Solar Products - Bharat Solar Solution" />
        <meta name="twitter:description" content="Browse our premium solar products including high-efficiency solar panels, inverters, batteries, water pumps, street lights, and more." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
        {/* Hero Section */}
        <motion.section
          className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white py-20 lg:py-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-orange-600/70"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
                Premium Solar
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 mt-2">
                  Products Collection
                </span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Discover India's finest selection of solar panels, inverters, batteries, and complete solar energy solutions. 
                Engineered for maximum efficiency and backed by industry-leading warranties.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Sun className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm font-medium">25+ Years Warranty</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Shield className="h-5 w-5 text-green-300" />
                  <span className="text-sm font-medium">Certified Products</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <BatteryCharging className="h-5 w-5 text-orange-300" />
                  <span className="text-sm font-medium">High Efficiency</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Search and Filter Section */}
        <motion.section
          className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Search Bar */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-500" />
                <input
                  type="text"
                  placeholder="Search solar products, brands, specifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-14 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all text-gray-900 text-lg placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-2 rounded-xl">
                    <SlidersHorizontal className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Filter Products</h3>
                    <p className="text-sm text-gray-500">Find exactly what you need</p>
                  </div>
                  {hasActiveFilters && (
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      size="sm"
                      className="ml-4 border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                  <ChevronRight className={`ml-2 h-4 w-4 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
                </Button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all bg-white text-gray-900 font-medium"
                    >
                      {categoryOptions.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Product Type Filter */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Type</label>
                    <select
                      value={selectedProductType}
                      onChange={(e) => setSelectedProductType(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all bg-white text-gray-900 font-medium"
                    >
                      <option value="all">All Types</option>
                      {productTypes.map(type => (
                        <option key={type} value={type}>{type.replace('-', ' ').toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  {/* Company Filter */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company</label>
                    <select
                      value={selectedCompany}
                      onChange={(e) => setSelectedCompany(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all bg-white text-gray-900 font-medium"
                    >
                      <option value="all">All Companies</option>
                      {companies.map(company => (
                        <option key={company} value={company}>{company}</option>
                      ))}
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-end">
                    <label className="block text-sm font-bold text-gray-700 mb-2 w-full">View</label>
                    <div className="flex gap-2 w-full">
                      <Button
                        variant={viewMode === 'grid' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className={`flex-1 transition-all duration-300 ${
                          viewMode === 'grid' 
                            ? 'bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white shadow-lg' 
                            : 'border-2 border-gray-200 hover:border-blue-500'
                        }`}
                      >
                        <Grid className="h-4 w-4 mr-2" /> Grid
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className={`flex-1 transition-all duration-300 ${
                          viewMode === 'list' 
                            ? 'bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white shadow-lg' 
                            : 'border-2 border-gray-200 hover:border-blue-500'
                        }`}
                      >
                        <List className="h-4 w-4 mr-2" /> List
                      </Button>
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="flex items-end">
                    <div className="w-full">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Results</label>
                      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl border-2 border-blue-200">
                        <span className="font-bold text-blue-600 text-lg">{filteredProducts.length}</span>
                        <span className="text-gray-600 ml-1">products</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Products Section */}
        <motion.section
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
      {/* Products Grid */}
      <motion.div
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id || product.id}
                variants={slideUp(index * 0.1)}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 rounded-3xl bg-white shadow-xl flex flex-col">
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex justify-center group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-orange-100 transition-all duration-500 h-56">
                    <img
                      src={product.image.startsWith('http') ? product.image : `http://api.bharatsolarsolution.com/${product.image.replace(/\\/g, "/")}`}
                      alt={product.alt || product.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg">
                        {product.category}
                      </div>
                      {product.productType && (
                        <div className="bg-purple-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg">
                          {product.productType.replace('-', ' ').toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg">
                      {product.company}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardHeader className="pb-4 flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">{product.title}</CardTitle>
                      <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-2 py-1 rounded-full shadow-md flex-shrink-0 ml-2">
                        <Star className="h-3.5 w-3.5 fill-white text-white mr-1" />
                        <span className="text-xs font-bold text-white">{product.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="grid grid-cols-2 gap-3 text-sm bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-2xl border border-gray-100">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-xs uppercase tracking-wide mb-1">Power</span>
                        <p className="text-gray-700 font-semibold">{product.specifications?.power}</p>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-xs uppercase tracking-wide mb-1">Efficiency</span>
                        <p className="text-gray-700 font-semibold">{product.specifications?.efficiency}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-semibold text-green-600">In Stock</span>
                      </div>
                      <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                        ₹{product.price?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-gray-100">
                    <Link to={`/quote-request?product=${product._id || product.id}`} className="w-full">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Get Quote <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
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
                        src={product.image.startsWith('http') ? product.image : `http://api.bharatsolarsolution.com/${product.image.replace(/\\/g, "/")}`}
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
                          <div>
                            <CardTitle className="text-xl">{product.title}</CardTitle>
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-1 inline-block">{product.company}</span>
                          </div>
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
      </motion.div>
        </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="py-16 bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-3xl mb-16 shadow-lg border border-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Solar Products?</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
            Our solar solutions are designed to deliver maximum efficiency, durability, and return on investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
          <motion.div
            className="text-center bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl hover:scale-110 transition-transform duration-300">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">25-Year Performance Warranty</h3>
            <p className="text-gray-600 leading-relaxed">
              Industry-leading warranty that guarantees your panels will perform at 85% capacity or more after 25 years.
            </p>
          </motion.div>

          <motion.div
            className="text-center bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl hover:scale-110 transition-transform duration-300">
              <Sun className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">High Efficiency Rates</h3>
            <p className="text-gray-600 leading-relaxed">
              Our panels convert more sunlight into electricity, maximizing energy production even in limited spaces.
            </p>
          </motion.div>

          <motion.div
            className="text-center bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl hover:scale-110 transition-transform duration-300">
              <BatteryCharging className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">Durability & Reliability</h3>
            <p className="text-gray-600 leading-relaxed">
              Engineered to withstand extreme weather conditions, from hailstorms to high winds and heavy snow loads.
            </p>
          </motion.div>
        </div>
      </motion.section>

    </div>
    </>
  );
};

export default SolarProductsPage;