const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phone: {type: String, required: true},
  specialty: {type: String, required: true},
  qualification: String,
  experience: {type: Number, default: 0},
  consultationFee: {type: Number, default: 500},
  avatar: {type: String, default: 'https://ui-avatars.com/api/?name=Doctor'},
  status: {type: String, enum: ['active', 'inactive'], default: 'active'},
  isApproved: {type: Boolean, default: false},
  totalPatients: {type: Number, default: 0},
  totalAppointments: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Doctor', doctorSchema);