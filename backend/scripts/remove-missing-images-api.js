const mongoose = require('mongoose');
const fs = require('fs');
const Image = require('../models/Image');

require('dotenv').config();

async function removeMissingImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://chinmayadob1999:Ket3Jfd6scgKiRxI@cluster0.zgkvein.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    console.log('Connected to database');
    
    const images = await Image.find({ isActive: true });
    console.log(`Found ${images.length} images in database`);

    const missingImages = [];

    for (const image of images) {
      const exists = fs.existsSync(image.path);
      
      if (!exists) {
        missingImages.push(image);
      }
    }

    if (missingImages.length === 0) {
      console.log('No missing images found. All images are present on disk.');
      process.exit(0);
    }

    console.log(`\nFound ${missingImages.length} missing images:`);
    missingImages.forEach(img => {
      console.log(`  - ${img.filename} (${img.path})`);
    });

    console.log('\nRemoving missing image entries from database...');
    
    const idsToDelete = missingImages.map(item => item._id);
    const result = await Image.deleteMany({ _id: { $in: idsToDelete } });
    
    console.log(`Successfully removed ${result.deletedCount} missing image entries from database.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

removeMissingImages();
