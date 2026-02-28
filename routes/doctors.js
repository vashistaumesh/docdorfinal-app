const express = require('express');
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({createdAt: -1});
    res.json({doctors});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const {name, email, phone, specialty, qualification, experience, consultationFee} = req.body;
    const exists = await Doctor.findOne({email});
    if (exists) return res.status(400).json({message: '❌ Doctor exists'});

    const doctor = new Doctor({name, email, phone, specialty, qualification, experience, consultationFee});
    await doctor.save();
    res.status(201).json({message: '✅ Doctor added', doctor});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!doctor) return res.status(404).json({message: '❌ Not found'});
    res.json({message: '✅ Updated', doctor});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.patch('/:id/approve', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, {isApproved: req.body.isApproved}, {new: true});
    res.json({message: '✅ Updated', doctor});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({message: '✅ Deleted'});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

module.exports = router;