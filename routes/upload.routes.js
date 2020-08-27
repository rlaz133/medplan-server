const express = require('express');
const router  = express.Router();
const { isDoctor } = require('../helpers/auth.helper')

// include CLOUDINARY:
const uploader = require('../configs/cloudinary.config');

router.post('/upload', uploader.single("reportUrl"), (req, res, next) => {
     console.log('file is: ', req.file)
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    res.json({ report: req.file.path });
})

module.exports = router;