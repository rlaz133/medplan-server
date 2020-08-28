const express = require('express');
const router  = express.Router();
const {PatientModel, DoctorModel} = require('../models/User.models');
const {AppointmentModel, PrescriptionModel} =require('../models/Tools.models')
const { isLoggedIn, isPatient } = require ('../helpers/auth.helper')

router.post('/patient/appointments/:doctorId', isPatient, (req, res)=>{
  let date = JSON.parse(req.body.event).start
  let eventId = JSON.parse(req.body.event).extendedProps.eventId
  AppointmentModel.create({doctor: req.params.doctorId, patient: req.session.loggedInUser._id, time: date, eventId})
    .then((appo)=>{res.status(200).json(appo)})
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })
})

router.patch('/patient/appointments/:doctorId', isPatient, (req, res)=>{
  let date = JSON.parse(req.body.event).start
  let eventId = JSON.parse(req.body.event).extendedProps.eventId
  AppointmentModel.findOneAndUpdate({eventId}, {$set: {time: date}})
    .then((appo)=>{res.status(200).json(appo)})
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })
})

router.delete('/patient/appointments/:doctorId', isPatient, (req, res)=>{
  let eventId = JSON.parse(req.body.event).extendedProps.eventId
  AppointmentModel.findOneAndRemove({eventId})
    .then((appo)=>{res.status(200).json(appo)})
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })
})

router.post('/patient/appointments/:doctorId', isPatient, (req, res)=>{
  let date = JSON.parse(req.body.event).start
  AppointmentModel.create({doctor: req.params.doctorId, patient: req.session.loggedInUser._id, time: date})
    .then((appo)=>{res.status(200).json(appo)})
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })
})

router.get('/patient/planner', isPatient,  (req, res)=>{
  console.log (req.session.loggedInUser._id)
  PatientModel.findById(req.session.loggedInUser._id).populate('prescriptions')
    .then(patient => res.status(200).json(patient))
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