const express = require('express');
const router  = express.Router();
const {PatientModel, DoctorModel} = require('../models/User.models');
const {AppointmentModel, PrescriptionModel} =('../model/Tools.models')
const { isPatient } = require ('../helpers/auth.helper')

router.post('/patient/appointments/:doctorId', isPatient, (req, res)=>{
  AppointmentModel.create({doctor: req.params.doctorId, patient: req.session.loggedInUser._id, time: req.body.event.start})
    .then((appo)=>{res.status(200).json(appo)})
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })
})

router.post('/patient/appointments/:doctorId', isPatient, (req, res)=>{
  AppointmentModel.create({doctor: req.params.doctorId, patient: req.session.loggedInUser._id, time: req.body.event.start})
    .then((appo)=>{res.status(200).json(appo)})
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })
})

module.exports = router