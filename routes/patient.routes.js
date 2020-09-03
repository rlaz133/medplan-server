const express = require('express');
const router  = express.Router();
const {PatientModel} = require('../models/User.models');
const {AppointmentModel } =require('../models/Tools.models')
const { isLoggedIn, isPatient } = require ('../helpers/auth.helper')

router.get('/patient/appointments', isPatient, (req, res)=>{
  AppointmentModel.find({patient: req.session.loggedInUser._id}).populate("doctor")
  .then((appo)=>{res.status(200).json(appo)})
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })
})

router.get('/patient/appointment/report/:appointmentId', isPatient, (req, res)=>{
  AppointmentModel.findById(req.params.appointmentId)
  .then((appo)=>{res.status(200).json(appo)})
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })
})

router.post('/patient/appointments/:doctorId', isPatient, (req, res)=>{
  console.log (req.body)
  AppointmentModel.create({doctor: req.params.doctorId, patient: req.session.loggedInUser._id, reason: req.body.reason, time: new Date(req.body.time), eventId: req.body.eventId})
    .then((appo)=>{res.status(200).json(appo)})
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })
})



router.patch('/patient/appointments/:doctorId', isPatient, (req, res)=>{
  AppointmentModel.findOneAndUpdate({eventId: req.body.eventId}, {$set: {time: new Date(req.body.time), reason: req.body.reason}})
    .then((appo)=>{res.status(200).json(appo)})
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })
})


router.delete('/patient/appointments/:doctorId/:eventId', isPatient, (req, res)=>{
  AppointmentModel.findOneAndRemove({eventId: req.params.eventId})
    .then((appo)=>{res.status(200).json(appo)})
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })
})

router.get('/planner', isPatient,  (req, res)=>{
  PatientModel.findById(req.session.loggedInUser._id).populate('prescriptions')
    .then(patient => res.status(200).json(patient))
    .catch((err) => {
          res.status(500).json({
              error: 'Something went wrong',
              message: err
          })
    })
  })

// router.get('/patient/:patientId', isLoggedIn, (req, res)=>{
//   console.log("test")
//   PatientModel.findById(req.params.patientId)
//     .then(patient => res.status(200).json(patient))
//     .catch((err) => {
//           res.status(500).json({
//               error: 'Something went wrong',
//               message: err
//           })
//     })
// })

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