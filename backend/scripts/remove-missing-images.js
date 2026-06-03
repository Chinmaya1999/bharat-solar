const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Gallery = require('../models/Gallery');

require('dotenv').config();

async function removeMissingImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://chinmayadob1999:Ket3Jfd6scgKiRxI@cluster0.zgkvein.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    console.log('Connected to database');
    
    const galleryItems = await Gallery.find({ isActive: true });
    console.log(`Found ${galleryItems.length} gallery items in database`);

    const missingImages = [];

    for (const item of galleryItems) {
      const filename = item.imageUrl.split('/').pop();
      
      // Check both possible locations
      const uploadsPath = path.join(__dirname, '../uploads', filename);
      const publicUploadsPath = path.join(__dirname, '../public/uploads', filename);
      
      const existsInUploads = fs.existsSync(uploadsPath);
      const existsInPublicUploads = fs.existsSync(publicUploadsPath);
      
      if (!existsInUploads && !existsInPublicUploads) {
        missingImages.push(item);
      }
    }

    if (missingImages.length === 0) {
      console.log('No missing images found. All images are present on disk.');
      process.exit(0);
    }

    console.log(`\nFound ${missingImages.length} missing images:`);
    missingImages.forEach(img => {
      console.log(`  - ${img.title} (${img.imageUrl})`);
    });

    console.log('\nRemoving missing image entries from database...');
    
    const idsToDelete = missingImages.map(item => item._id);
    const result = await Gallery.deleteMany({ _id: { $in: idsToDelete } });
    
    console.log(`Successfully removed ${result.deletedCount} missing image entries from database.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

removeMissingImages();
