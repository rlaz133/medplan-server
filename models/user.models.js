const { Schema, model } = require('mongoose');


let patientSchema = new Schema({
  username: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  passwordHash: {
      type: String,
      required: true
  }, 
  address: String,
  allergies: String,
  history: String,
  prescriptions: [
    {
      type: Schema.Types.ObjectId, 
      ref: 'prescription'
    }
  ],
  phoneNumber: Number,
  birthDate: Date,
  weight: Number,
  height: Number

});

let doctorSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  address: String,
  speciality: String,
  businessHours:{
    daysofWeek:{
      type: [Number],
      enum: [1, 2, 3, 4, 5]
    },
    startTime: String,
    endTime: String
  },
  phone: String,
  picture: String,
  city: String
})

module.exports = {PatientModel: model('patient', patientSchema), DoctorModel: model('doctor', doctorSchema)};