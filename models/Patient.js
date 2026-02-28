const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phone: {type: String, required: true},
  age: Number,
  gender: String,
  address: String,
  avatar: {type: String, default: 'https://ui-avatars.com/api/?name=Patient'},
  totalAppointments: {type: Number, default: 0},
  completedAppointments: {type: Number, default: 0},
  status: {type: String, enum: ['active', 'inactive'], default: 'active'},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Patient', patientSchema);