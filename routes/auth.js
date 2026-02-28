const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    const adminExists = await Admin.findOne({email});
    if (adminExists) return res.status(400).json({message: '❌ Admin exists'});

    const admin = new Admin({name, email, password});
    await admin.save();

    const token = jwt.sign({id: admin._id, email}, process.env.JWT_SECRET, {expiresIn: '7d'});
    res.status(201).json({message: '✅ Registered', token, admin: {id: admin._id, name, email, role: admin.role, clinic: admin.clinic, avatar: admin.avatar}});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const admin = await Admin.findOne({email});
    if (!admin) return res.status(401).json({message: '❌ Invalid credentials'});

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({message: '❌ Invalid credentials'});

    const token = jwt.sign({id: admin._id, email}, process.env.JWT_SECRET, {expiresIn: '7d'});
    res.json({message: '✅ Login success', token, admin: {id: admin._id, name: admin.name, email: admin.email, role: admin.role, clinic: admin.clinic, avatar: admin.avatar}});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    res.json({admin});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

module.exports = router;