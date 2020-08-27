const express = require('express');
const router  = express.Router();
const {PatientModel, DoctorModel} = require('../models/User.models');
const { isPatient, isDoctor, isLoggedIn } = require ('../helpers/auth.helper')
const {AppointmentModel, PrescriptionModel} = require ('../models/Tools.models')

router.get('/doctor/search', (req, res)=>{
  DoctorModel.find()
    .then(doctors => res.status(200).json(doctors))
    .catch((err) => {
          res.status(500).json({
              error: 'Something went wrong',
              message: err
          })
    })
})

router.get('/doctor/:doctorId', isLoggedIn, (req, res)=>{
  DoctorModel.findById(req.params.doctorId)
    .then(doctor => res.status(200).json(doctor))
    .catch((err) => {
          res.status(500).json({
              error: 'Something went wrong',
              message: err
          })
    })
})

router.get('/doctor/appointments/:doctorId', isLoggedIn, (req, res)=>{
  AppointmentModel.find({doctor: req.params.doctorId})
    .then(appointments => res.status(200).json(appointments))
    .catch((err) => {
          res.status(500).json({
              error: 'Something went wrong',
              message: err
          })
    })
})

router.patch('/doctor/:doctorId', isDoctor, (req, res)=>{
  DoctorModel.findByIdAndUpdate(req.params.doctorId, {$set: req.body})
    .then(doctor => res.status(200).json(doctor))
    .catch((err) => {
          res.status(500).json({
              error: 'Something went wrong',
              message: err
          })
    })
})

router.delete('/doctor/appointment/cancel/:appointmentId', isDoctor, (req, res)=>{
  AppointmentModel.findByIdAndDelete(req.params.appointmentId)
    .then(doctor => res.status(200).json(doctor))
    .catch((err) => {
          res.status(500).json({
              error: 'Something went wrong',
              message: err
          })
    })
})

router.post('/doctor/appointment/cancel/:appointmentId', isDoctor, (req, res)=>{
  AppointmentModel.findByIdAndDelete(req.params.appointmentId)
    .then(doctor => res.status(200).json(doctor))
    .catch((err) => {
          res.status(500).json({
              error: 'Something went wrong',
              message: err
          })
    })
})

router.post('/doctor/appointment/prescription/:appointmentId', isDoctor, (req, res)=>{
  const {name, dosePerTake, frequency, startDate, endDate, comments} = req.body
  PrescriptionModel.create(name, dosePerTake, frequency, startDate, endDate, comments)
    .then(prescription => res.status(200).json(prescription))
    .catch((err) => {
          res.status(500).json({
              error: 'Something went wrong',
              message: err
          })
    })
})





module.exports = router