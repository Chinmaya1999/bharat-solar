// routes/images.js
const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const upload = require('../config/multer');
const { getImages, uploadImage, deleteImage } = require('../controllers/imageController');

const router = express.Router();

router.get('/', getImages);
router.post('/upload', authenticateToken, requireAdmin, upload.single('image'), uploadImage);
router.delete('/:id', authenticateToken, requireAdmin, deleteImage);

module.exports = router;