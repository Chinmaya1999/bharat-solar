// routes/products.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// GET all products
router.get('/', async (req, res) => {
  try {
    const { category, company, productType, page = 1, limit = 10 } = req.query;
    let query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (company && company !== 'all') {
      query.company = company;
    }

    if (productType && productType !== 'all') {
      query.productType = productType;
    }

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      company,
      features,
      specifications,
      priceRange,
      price,
      rating,
      alt
    } = req.body;

    // Parse JSON strings if they are strings
    const featuresArray = typeof features === 'string' ? JSON.parse(features) : features;
    const specsObject = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;

    const product = new Product({
      title,
      description,
      category,
      company,
      features: featuresArray,
      specifications: specsObject,
      priceRange,
      price: parseFloat(price),
      rating: parseFloat(rating),
      alt,
      image: req.file ? req.file.path : ''
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      company,
      features,
      specifications,
      priceRange,
      price,
      rating,
      alt
    } = req.body;

    // Get existing product to preserve image if not updated
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updateData = {
      title,
      description,
      category,
      company,
      features: typeof features === 'string' ? JSON.parse(features) : features,
      specifications: typeof specifications === 'string' ? JSON.parse(specifications) : specifications,
      priceRange,
      price: parseFloat(price),
      rating: parseFloat(rating),
      alt,
      image: req.file ? req.file.path : existingProduct.image,
      updatedAt: Date.now()
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE product (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false, updatedAt: Date.now() },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET companies
router.get('/meta/companies', async (req, res) => {
  try {
    const companies = await Product.distinct('company', { isActive: true });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET product types
router.get('/meta/product-types', async (req, res) => {
  try {
    const productTypes = await Product.distinct('productType', { isActive: true });
    res.json(productTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;