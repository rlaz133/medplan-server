const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Please add your details here
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'MedPlan', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  // params: { resource_type: 'raw' }, 
  filename: function (req, res, cb) {
    cb(null, res.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

// const storageRep = new CloudinaryStorage({
//   cloudinary,
//   folder: 'MedPlan', // The name of the folder in cloudinary
//   allowedFormats: ['pdf'],
//   params: { resource_type: 'image' }, 
//   filename: function (req, res, cb) {
//     cb(null, res.originalname); // The file on cloudinary would have the same name as the original file name
//   }
// });

module.exports = multer({ storage });