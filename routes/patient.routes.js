const express = require('express');
const router  = express.Router();
const {PatientModel, DoctorModel} = require('../models/User.models');
const {AppointmentModel, PrescriptionModel} =require('../models/Tools.models')
const { isLoggedIn, isPatient } = require ('../helpers/auth.helper')

router.post('/patient/appointments/:doctorId', isPatient, (req, res)=>{
  console.log (req.body)
  console.log (AppointmentModel)
  AppointmentModel.create({doctor: req.params.doctorId, patient: req.session.loggedInUser._id, time: req.body.event.start})
    .then((appo)=>{res.status(200).json(appo)})
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })
})

router.get('/patient/:patientId', isLoggedIn, (req, res)=>{
  PatientModel.findById(req.params.patientId)
    .then(patient => res.status(200).json(patient))
    .catch((err) => {
          res.status(500).json({
              error: 'Something went wrong',
              message: err
          })
    })
})

router.patch('/patient/:patientId', isPatient, (req, res)=>{
  PatientModel.findByIdAndUpdate(req.params.patientId, {$set: req.body})
    .then(patient => res.status(200).json(patient))
    .catch((err) => {
          res.status(500).json({
              error: 'Something went wrong',
              message: err
          })
    })
})



module.exports = router