const express = require('express');
const router = express.Router();
const {
  createSolarUser,
  getAllSolarUsers,
  getSolarUserById,
  updateSolarUser,
  updateSolarUserStatus,
  deleteSolarUser,
  upload
} = require('../controllers/solarUserController');
const auth = require('../middleware/auth');

// Create solar user with document uploads
router.post('/', 
  auth,
  upload.fields([
    { name: 'aadharCard', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'electricityBill', maxCount: 1 },
    { name: 'propertyDocument', maxCount: 1 },
    { name: 'bankPassbook', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 }
  ]),
  createSolarUser
);

// Get all solar users with filters
router.get('/', auth, getAllSolarUsers);

// Get single solar user
router.get('/:id', auth, getSolarUserById);

// Update solar user
router.put('/:id', 
  auth,
  upload.fields([
    { name: 'aadharCard', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'electricityBill', maxCount: 1 },
    { name: 'propertyDocument', maxCount: 1 },
    { name: 'bankPassbook', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 }
  ]),
  updateSolarUser
);

// Update solar user status
router.put('/:id/status', auth, updateSolarUserStatus);

// Delete solar user
router.delete('/:id', auth, deleteSolarUser);

module.exports = router;
