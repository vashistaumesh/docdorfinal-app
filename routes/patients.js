const express = require('express');
const Patient = require('../models/Patient');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const patients = await Patient.find().sort({createdAt: -1});
    res.json({patients});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({message: '✅ Patient added', patient});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({message: '✅ Updated', patient});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({message: '✅ Deleted'});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

module.exports = router;