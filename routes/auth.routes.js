const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const {PatientModel, DoctorModel} = require('../models/User.models');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
