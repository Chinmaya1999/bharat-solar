const fs = require('fs');
const multer = require('multer'); // Import multer for error handling
const Image = require('../models/Image');

const getImages = async (req, res) => {
  try {
    const images = await Image.find({ isActive: true }).sort({ uploadedAt: -1 });
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const image = new Image({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      uploadedBy: req.user.id
    });
    
    await image.save();
    res.status(201).json({ 
      message: 'Image uploaded successfully', 
      image: {
        id: image._id,
        filename: image.filename,
        originalName: image.originalName,
        size: image.size,
        uploadedAt: image.uploadedAt
      }
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    
    // Handle Multer errors
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          error: 'File too large. Maximum size is 25MB.' 
        });
      }
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    // Delete file from filesystem (check if it exists first)
    if (fs.existsSync(image.path)) {
      fs.unlinkSync(image.path);
    }
    
    // Delete from database
    await Image.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};

module.exports = { getImages, uploadImage, deleteImage };