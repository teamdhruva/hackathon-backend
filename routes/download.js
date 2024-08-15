const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs'); 
const isAuthenticated=require('../middleware/auth')

// Endpoint to serve the .ipynb file as a ZIP
router.get('/:filename',(req, res) => {
  const filename = req.params.filename;
  // Determine the ZIP file based on the filename parameter
  const fileName = (filename === "eta") ? "Statment-(eta).zip" : "Statment-(mu).zip";
  const filePath = path.join(__dirname, '../ipynb', fileName); // Adjust path based on directory structure

  // Check if the file exists before attempting to download
  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file.');
      }
    });
  } else {
    res.status(404).send('File not found.');
  }
});

module.exports = router;
