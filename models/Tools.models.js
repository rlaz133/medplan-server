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
  },
  report: String,
  eventId: Number
})

let prescriptionSchema = new Schema({
  medications: [
    {
      name: {
        type: String,
        required: true
      },
      dosePerTake: {
        type: String,
        required: true
      },
      takesPerDay: {
        type: Number,
        required: true},
      daysPerTake:{
        type: Number,
        required: true},
      startDate: {
        type: String,
        required: true},
      endDate: {
        type: String,
        required: true},
      comments: String    
    }
  ]
}
)

module.exports = {AppointmentModel: model('appointment', appointmentSchema), PrescriptionModel: model('prescription', prescriptionSchema)};