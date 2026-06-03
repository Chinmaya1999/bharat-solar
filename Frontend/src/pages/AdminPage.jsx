import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Search,
  Loader2
} from 'lucide-react';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://api.bharatsolarsolution.com/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (productData) => {
    try {
      const url = editingProduct 
        ? `http://api.bharatsolarsolution.com/api/products/${editingProduct._id}`
        : 'http://api.bharatsolarsolution.com/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const formData = new FormData();
      Object.keys(productData).forEach(key => {
        if (key === 'features' || key === 'specifications') {
          formData.append(key, JSON.stringify(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      });

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        fetchProducts();
        setEditingProduct(null);
        setIsAdding(false);
      }
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`http://api.bharatsolarsolution.com/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-extrabold mb-2">
            Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Management</span>
          </h1>
          <p className="text-gray-600">Add, edit, and manage your solar products</p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-semibold px-6"
          >
            <Plus className="h-5 w-5 mr-2" /> Add Product
          </Button>
        </motion.div>

        {/* Product Form */}
        {(isAdding || editingProduct) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>{isAdding ? 'Add New Product' : 'Edit Product'}</CardTitle>
                <CardDescription>
                  {isAdding ? 'Fill in the details to add a new product' : 'Update the product information'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductForm
                  product={editingProduct}
                  onSave={handleSave}
                  onCancel={() => {
                    setIsAdding(false);
                    setEditingProduct(null);
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Products List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-4"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="w-full md:w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.company}</p>
                      <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-semibold text-blue-600">₹{product.price?.toLocaleString('en-IN')}</span>
                        <span className="text-gray-500">{product.category}</span>
                        <span className="text-gray-500">{product.productType}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'residential',
    company: '',
    productType: 'solar-panels',
    features: '',
    specifications: {
      power: '',
      efficiency: '',
      dimensions: '',
      weight: ''
    },
    price: '',
    rating: 0,
    alt: '',
    image: null
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        category: product.category || 'residential',
        company: product.company || '',
        productType: product.productType || 'solar-panels',
        features: product.features?.join('\n') || '',
        specifications: {
          power: product.specifications?.power || '',
          efficiency: product.specifications?.efficiency || '',
          dimensions: product.specifications?.dimensions || '',
          weight: product.specifications?.weight || ''
        },
        price: product.price || '',
        rating: product.rating || 0,
        alt: product.alt || '',
        image: null
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      features: formData.features.split('\n').filter(f => f.trim()),
      price: Number(formData.price),
      rating: Number(formData.rating)
    };

    onSave(productData);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name.startsWith('specifications.')) {
      const specKey = name.split('.')[1];
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [specKey]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Company *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
            <option value="specialized">Specialized</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Product Type *</label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          >
            <option value="solar-panels">Solar Panels</option>
            <option value="inverters">Inverters</option>
            <option value="batteries">Batteries</option>
            <option value="water-pumps">Water Pumps</option>
            <option value="street-lights">Street Lights</option>
            <option value="wires">Wires</option>
            <option value="accessories">Accessories</option>
            <option value="ev-chargers">EV Chargers</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Price (₹) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Features (one per line)</label>
        <textarea
          name="features"
          value={formData.features}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Power</label>
          <input
            type="text"
            name="specifications.power"
            value={formData.specifications.power}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Efficiency</label>
          <input
            type="text"
            name="specifications.efficiency"
            value={formData.specifications.efficiency}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Dimensions</label>
          <input
            type="text"
            name="specifications.dimensions"
            value={formData.specifications.dimensions}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Weight</label>
          <input
            type="text"
            name="specifications.weight"
            value={formData.specifications.weight}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Rating (0-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Alt Text</label>
          <input
            type="text"
            name="alt"
            value={formData.alt}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Product Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-semibold"
        >
          <Save className="h-4 w-4 mr-2" /> Save Product
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          <X className="h-4 w-4 mr-2" /> Cancel
        </Button>
      </div>
    </form>
  );
};

export default AdminPage;
