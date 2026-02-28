const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true, lowercase: true},
  password: {type: String, required: true},
  role: {type: String, default: 'admin'},
  clinic: {type: String, default: 'DocDoor'},
  avatar: {type: String, default: 'https://ui-avatars.com/api/?name=DocDoor'},
  isActive: {type: Boolean, default: true},
  createdAt: {type: Date, default: Date.now}
});

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.comparePassword = async function(pwd) {
  return await bcrypt.compare(pwd, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);