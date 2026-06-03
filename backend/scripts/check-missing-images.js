const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Gallery = require('../models/Gallery');

require('dotenv').config();

async function checkMissingImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://chinmayadob1999:Ket3Jfd6scgKiRxI@cluster0.zgkvein.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to database');
    
    const galleryItems = await Gallery.find({ isActive: true });
    console.log(`Found ${galleryItems.length} gallery items in database`);

    const missingImages = [];
    const foundImages = [];

    for (const item of galleryItems) {
      const filename = item.imageUrl.split('/').pop();
      
      // Check both possible locations
      const uploadsPath = path.join(__dirname, '../uploads', filename);
      const publicUploadsPath = path.join(__dirname, '../public/uploads', filename);
      
      const existsInUploads = fs.existsSync(uploadsPath);
      const existsInPublicUploads = fs.existsSync(publicUploadsPath);
      
      if (existsInUploads || existsInPublicUploads) {
        foundImages.push({
          title: item.title,
          filename: filename,
          location: existsInUploads ? 'uploads/' : 'public/uploads/'
        });
      } else {
        missingImages.push({
          _id: item._id,
          title: item.title,
          imageUrl: item.imageUrl,
          filename: filename
        });
      }
    }

    console.log('\n=== FOUND IMAGES ===');
    console.log(`${foundImages.length} images found on disk:`);
    foundImages.forEach(img => {
      console.log(`  ✓ ${img.title} (${img.filename}) - ${img.location}`);
    });

    console.log('\n=== MISSING IMAGES ===');
    console.log(`${missingImages.length} images missing from disk:`);
    missingImages.forEach(img => {
      console.log(`  ✗ ${img.title} (${img.filename})`);
      console.log(`    ID: ${img._id}`);
      console.log(`    Image URL: ${img.imageUrl}`);
    });

    if (missingImages.length > 0) {
      console.log('\n=== RECOMMENDATION ===');
      console.log('To fix missing images, you can:');
      console.log('1. Re-upload the missing images through the admin dashboard');
      console.log('2. Or remove the database entries for missing images using:');
      console.log(`   node scripts/remove-missing-images.js`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkMissingImages();
