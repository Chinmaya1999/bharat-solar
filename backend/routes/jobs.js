const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all active job listings
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new job listing (admin only)
router.post('/', async (req, res) => {
  const job = new Job({
    title: req.body.title,
    department: req.body.department,
    location: req.body.location,
    type: req.body.type,
    description: req.body.description,
    requirements: req.body.requirements,
    benefits: req.body.benefits
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;