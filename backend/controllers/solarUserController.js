const SolarUser = require('../models/SolarUser');
const multer = require('multer');
const path = require('path');

// Configure multer for document uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/solar-documents/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === 'application/pdf';
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png) and documents (pdf, doc, docx) are allowed!'));
    }
  }
});

// Create solar user registration
const createSolarUser = async (req, res) => {
  try {
    const documents = {};
    
    // Handle document uploads
    if (req.files) {
      if (req.files.aadharCard) documents.aadharCard = req.files.aadharCard[0].path;
      if (req.files.panCard) documents.panCard = req.files.panCard[0].path;
      if (req.files.electricityBill) documents.electricityBill = req.files.electricityBill[0].path;
      if (req.files.propertyDocument) documents.propertyDocument = req.files.propertyDocument[0].path;
      if (req.files.bankPassbook) documents.bankPassbook = req.files.bankPassbook[0].path;
      if (req.files.passportPhoto) documents.passportPhoto = req.files.passportPhoto[0].path;
    }
    
    const solarUser = new SolarUser({
      ...req.body,
      ...documents
    });
    
    await solarUser.save();
    res.status(201).json(solarUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all solar users with filters
const getAllSolarUsers = async (req, res) => {
  try {
    const { status, district, search } = req.query;
    const filter = {};
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    if (district && district !== 'all') {
      filter.district = district;
    }
    
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { applicationNumber: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const solarUsers = await SolarUser.find(filter).sort({ createdAt: -1 });
    res.json(solarUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single solar user
const getSolarUserById = async (req, res) => {
  try {
    const solarUser = await SolarUser.findById(req.params.id);
    if (!solarUser) {
      return res.status(404).json({ error: 'Solar user not found' });
    }
    res.json(solarUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update solar user
const updateSolarUser = async (req, res) => {
  try {
    const updates = req.body;
    
    // Handle document uploads if any
    if (req.files) {
      if (req.files.aadharCard) updates.aadharCard = req.files.aadharCard[0].path;
      if (req.files.panCard) updates.panCard = req.files.panCard[0].path;
      if (req.files.electricityBill) updates.electricityBill = req.files.electricityBill[0].path;
      if (req.files.propertyDocument) updates.propertyDocument = req.files.propertyDocument[0].path;
      if (req.files.bankPassbook) updates.bankPassbook = req.files.bankPassbook[0].path;
      if (req.files.passportPhoto) updates.passportPhoto = req.files.passportPhoto[0].path;
    }
    
    const solarUser = await SolarUser.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!solarUser) {
      return res.status(404).json({ error: 'Solar user not found' });
    }
    
    res.json(solarUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update solar user status
const updateSolarUserStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    
    const solarUser = await SolarUser.findByIdAndUpdate(
      req.params.id,
      { status, remarks },
      { new: true, runValidators: true }
    );
    
    if (!solarUser) {
      return res.status(404).json({ error: 'Solar user not found' });
    }
    
    res.json(solarUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete solar user
const deleteSolarUser = async (req, res) => {
  try {
    const solarUser = await SolarUser.findByIdAndDelete(req.params.id);
    if (!solarUser) {
      return res.status(404).json({ error: 'Solar user not found' });
    }
    res.json({ message: 'Solar user deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSolarUser,
  getAllSolarUsers,
  getSolarUserById,
  updateSolarUser,
  updateSolarUserStatus,
  deleteSolarUser,
  upload
};
