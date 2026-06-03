const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Image = require('../models/Image');

require('dotenv').config();

async function checkMissingImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://chinmayadob1999:Ket3Jfd6scgKiRxI@cluster0.zgkvein.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    console.log('Connected to database');
    
    const images = await Image.find({ isActive: true });
    console.log(`Found ${images.length} images in database`);

    const missingImages = [];
    const foundImages = [];

    for (const image of images) {
      const exists = fs.existsSync(image.path);
      
      if (exists) {
        foundImages.push({
          _id: image._id,
          filename: image.filename,
          path: image.path
        });
      } else {
        missingImages.push({
          _id: image._id,
          filename: image.filename,
          path: image.path
        });
      }
    }

    console.log('\n=== FOUND IMAGES ===');
    console.log(`${foundImages.length} images found on disk:`);
    foundImages.forEach(img => {
      console.log(`  ✓ ${img.filename} (${img.path})`);
    });

    console.log('\n=== MISSING IMAGES ===');
    console.log(`${missingImages.length} images missing from disk:`);
    missingImages.forEach(img => {
      console.log(`  ✗ ${img.filename} (${img.path})`);
      console.log(`    ID: ${img._id}`);
    });

    if (missingImages.length > 0) {
      console.log('\n=== RECOMMENDATION ===');
      console.log('To fix missing images, you can:');
      console.log('1. Remove the database entries for missing images using:');
      console.log(`   node scripts/remove-missing-images-api.js`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkMissingImages();
