// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({origin: 'http://localhost:3000', credentials: true}));

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.log('❌ MongoDB Error:', err));

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/doctors', require('./routes/doctors'));
// app.use('/api/patients', require('./routes/patients'));
// app.use('/api/appointments', require('./routes/appointments'));
// app.use('/api/dashboard', require('./routes/dashboard'));

// app.get('/api/health', (req, res) => {
//   res.json({status: '✅ DocDoor Backend Running', time: new Date()});
// });

// app.listen(process.env.PORT, () => {
//   console.log(`\n🚀 DocDoor Backend running on http://localhost:${process.env.PORT}`);
//   console.log(`📊 API Endpoints: http://localhost:${process.env.PORT}/api/`);
//   console.log(`🔗 MongoDB: Connected\n`);
// });  


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

/* ================================
   ✅ MIDDLEWARE
================================ */
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://frontenddocdoradmin-ff3n.vercel.app"
  ],
  credentials: true
}));

/* ================================
   ✅ MONGODB CONNECTION
================================ */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

/* ================================
   ✅ ROUTES
================================ */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/dashboard', require('./routes/dashboard'));

/* ================================
   ✅ HEALTH CHECK API
================================ */
app.get('/api/health', (req, res) => {
  res.json({
    status: '✅ DocDoor Backend Running',
    time: new Date()
  });
});

/* ================================
   ✅ SERVER START
================================ */
const PORT = process.env.PORT || 9004;

app.listen(PORT, () => {
  console.log(`\n🚀 DocDoor Backend running on http://localhost:${PORT}`);
  console.log(`📊 API Endpoints: http://localhost:${PORT}/api/`);
  console.log(`🔗 MongoDB: Connected\n`);
});
