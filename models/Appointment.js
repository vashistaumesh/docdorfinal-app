const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'},
  patientId: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
  doctorName: String,
  patientName: String,
  specialty: String,
  appointmentDate: {type: Date, required: true},
  timeSlot: {type: String, required: true},
  consultationFee: {type: Number, default: 500},
  status: {type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending'},
  consultationType: {type: String, enum: ['online', 'offline'], default: 'offline'},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Appointment', appointmentSchema);