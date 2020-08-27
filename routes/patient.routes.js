const express = require('express');
const router  = express.Router();
const {PatientModel, DoctorModel} = require('../models/User.models');
const { isPatient } = require ('../helpers/auth.helper')

router.get('/patient', isPatient, (req, res)=>{
  console.log('Authorized')
})

module.exports = router