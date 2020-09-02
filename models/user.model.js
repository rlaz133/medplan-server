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
  phoneNumber: String,
  birthDate: String,
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
  openingTime: {type: String, default: "09:00"},
  closingTime: {type: String, default: "18:00"},
  phone: String,
  picture: {type: String, default: "../images/no-pic-doc.png"},
  city: String
})

module.exports = {PatientModel: model('patient', patientSchema), DoctorModel: model('doctor', doctorSchema)};