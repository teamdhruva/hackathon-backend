const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/:teamId', (req, res) => {
  try {
    const { teamId } = req.params;
    const imageFolderPath = path.join(__dirname, '../images', teamId);

    const imageFiles = ['person1.jpeg', 'person2.jpeg'];
    const images = imageFiles.map(file => {
      const filePath = path.join(imageFolderPath, file);

      if (fs.existsSync(filePath)) {
        const imageBuffer = fs.readFileSync(filePath);
        return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
      } else {
        return null; // Return null for missing files
      }
    });
    
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ error: 'Failed to load images. Please try again later.' });
  }
});

module.exports = router;
