const express = require('express');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/stats', auth, async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const todayAppointments = await Appointment.countDocuments({
      appointmentDate: {
        $gte: new Date(new Date().setHours(0,0,0,0)),
        $lt: new Date(new Date().setHours(23,59,59,999))
      }
    });
    const pendingAppointments = await Appointment.countDocuments({status: 'pending'});
    const completedAppointments = await Appointment.countDocuments({status: 'completed'});

    const revenueData = await Appointment.aggregate([
      {$match: {status: 'completed'}},
      {$group: {_id: null, totalRevenue: {$sum: '$consultationFee'}}}
    ]);
    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.json({
      stats: {
        totalDoctors: {value: totalDoctors, change: '+12%'},
        totalPatients: {value: totalPatients, change: '+8%'},
        totalAppointments: {value: totalAppointments, change: '+15%'},
        todayAppointments: {value: todayAppointments, pending: pendingAppointments},
        completedAppointments,
        totalRevenue: {value: totalRevenue, change: '+5%'}
      }
    });
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

router.get('/recent-appointments', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId', 'name specialty').populate('patientId', 'name phone').sort({appointmentDate: -1}).limit(10);
    res.json({appointments});
  } catch (error) {
    res.status(500).json({message: '❌ Error', error: error.message});
  }
});

module.exports = router;