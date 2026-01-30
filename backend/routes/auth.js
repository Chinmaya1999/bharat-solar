const express = require('express');
const { signup, login, setupAdmin, getProfile, getAllUsers } = require('../controllers/authController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/setup-admin', setupAdmin);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.get('/users', authenticateToken, requireAdmin, getAllUsers);

module.exports = router;