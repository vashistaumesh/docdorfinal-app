const express = require('express');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId').populate('patientId').sort({appointmentDate: -1});
    res.json({appointments});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({message: '✅ Created', appointment});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.patch('/:id/status', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new: true});
    res.json({message: '✅ Updated', appointment});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({message: '✅ Deleted'});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

module.exports = router;