// routes/users.js
const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { getUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/', authenticateToken, requireAdmin, getUsers);

module.exports = router;