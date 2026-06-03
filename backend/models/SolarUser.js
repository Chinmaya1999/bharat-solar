const mongoose = require('mongoose');

const solarUserSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  
  // Surya Ghara Jojana Details
  schemeType: {
    type: String,
    enum: ['Surya Ghara Jojana', 'PM Surya Ghar Yojana', 'Other'],
    default: 'Surya Ghara Jojana'
  },
  consumerNumber: {
    type: String,
    required: true
  },
  electricityBoard: {
    type: String,
    required: true
  },
  monthlyConsumption: {
    type: String,
    required: true
  },
  roofArea: {
    type: String,
    required: true
  },
  proposedCapacity: {
    type: String,
    required: true
  },
  
  // Document Uploads
  aadharCard: {
    type: String
  },
  panCard: {
    type: String
  },
  electricityBill: {
    type: String
  },
  propertyDocument: {
    type: String
  },
  bankPassbook: {
    type: String
  },
  passportPhoto: {
    type: String
  },
  
  // Application Status
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Document Verified', 'Approved', 'Rejected', 'Installation In Progress', 'Completed'],
    default: 'Pending'
  },
  remarks: {
    type: String
  },
  
  // Tracking
  applicationNumber: {
    type: String,
    unique: true
  },
  
}, {
  timestamps: true
});

// Generate application number before saving
solarUserSchema.pre('save', async function(next) {
  if (!this.applicationNumber) {
    const count = await this.constructor.countDocuments();
    this.applicationNumber = `SGJ-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('SolarUser', solarUserSchema);
