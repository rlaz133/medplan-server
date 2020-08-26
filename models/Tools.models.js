const { Schema, model } = require('mongoose');

let appointmentSchema = new Schema({
  doctor:{
    type: Schema.Types.ObjectId,
    ref: 'doctor'
  },
  patient:{
    type: Schema.Types.ObjectId,
    ref: 'patient'
  },
  time: Date,
  reason: String,
  prescription: {
    type: Schema.Types.ObjectId,
    ref:'prescription'
  }
})

let prescriptionSchema = new Schema({
  medications: [
    {
      name: String,
      dosePerTake: String,
      frecuency:{
        takesPerDay: Number,
        daysPerTake:  Number
      },
      startDate: Date,
      endDate: Date,
      comments: String    
    }
  ]
}, 
{timestamps: {}}
)

module.exports = {AppointmentModel: model('appointment', appointmentSchema), PrescriptionModel: model('prescription', prescriptionSchema)};