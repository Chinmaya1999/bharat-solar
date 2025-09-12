// server.js (updated)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

// Import routes
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const imageRoutes = require('./routes/images');
const userRoutes = require('./routes/users');
const Product = require('./routes/products');
const jobRoutes = require('./routes/jobs'); // Add this line
const applicationRoutes = require('./routes/applications'); // Add this line
const galleryRoutes = require('./routes/gallery');

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://chinmayadob1999:Ket3Jfd6scgKiRxI@cluster0.zgkvein.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', Product);
app.use('/api/jobs', jobRoutes); // Add this line
app.use('/api/applications', applicationRoutes); // Add this line
app.use('/api/gallery', galleryRoutes);

// Global error handling middleware for Multer errors
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large. Maximum size is 25MB.'
      });
    }
    
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        error: 'Unexpected field. Please upload a single image file.'
      });
    }
  }
  
  // Handle other file filter errors
  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({
      error: 'Only image files (jpg, jpeg, png, gif, etc.) are allowed!'
    });
  }
  
  next(error);
});

// Initialize the app with a default admin if none exists
const initializeApp = async () => {
  const User = require('./models/User');
  const adminExists = await User.findOne({ role: 'admin' });
  if (!adminExists) {
    console.log('No admin user found. Please create one at /api/setup-admin');
  }
};

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  initializeApp();
});