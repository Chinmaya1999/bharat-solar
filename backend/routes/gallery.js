const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'public/uploads/';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Check file types
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// GET all gallery items (with optional filtering)
router.get('/', async (req, res) => {
  try {
    const { category, type, page = 1, limit = 12 } = req.query;
    let query = { isActive: true };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (type) {
      query.type = type;
    }
    
    const galleryItems = await Gallery.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Gallery.countDocuments(query);
    
    res.json({
      galleryItems,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single gallery item
router.get('/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new gallery item
router.post('/', upload.single('media'), async (req, res) => {
  try {
    const { title, description, category, location, type } = req.body;
    
    // Determine media type based on file mimetype
    let mediaType = type;
    if (!mediaType && req.file) {
      mediaType = req.file.mimetype.startsWith('image/') ? 'photo' : 'video';
    }
    
    // Create relative path for the uploaded file
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    
    const galleryItem = new Gallery({
      title,
      description,
      imageUrl,
      category,
      location,
      type: mediaType
    });
    
    const newGalleryItem = await galleryItem.save();
    res.status(201).json(newGalleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update gallery item
router.put('/:id', upload.single('media'), async (req, res) => {
  try {
    const { title, description, category, location, type } = req.body;
    let updateData = { title, description, category, location, type };
    
    // If a new file is uploaded, update the imageUrl
    if (req.file) {
      // Determine media type based on file mimetype
      updateData.type = req.file.mimetype.startsWith('image/') ? 'photo' : 'video';
      updateData.imageUrl = `/uploads/${req.file.filename}`;
      
      // Optionally delete the old file
      const oldItem = await Gallery.findById(req.params.id);
      if (oldItem && oldItem.imageUrl) {
        const oldFilePath = path.join('public', oldItem.imageUrl);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }
    
    const updatedItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE gallery item (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// HARD DELETE gallery item (including file)
router.delete('/:id/hard', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    // Delete the associated file
    if (item.imageUrl) {
      const filePath = path.join('public', item.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;