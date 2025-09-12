const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  resume: {
    type: String, // Path to uploaded file
    required: true
  },
  coverLetter: {
    type: String
  },
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Rejected', 'Accepted'],
    default: 'Submitted'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);