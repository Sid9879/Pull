const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const config = require('./config');

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://health-recovery-two.vercel.app",
    ],
    credentials: true,
  })
);


app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Database Connection
mongoose.connect(config.database.dbConnectionString)
.then(() => console.log('Connected to MongoDB - Health checkup API'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/auth');
const patientRoutes = require('./routes/user');

app.use('/api/auth', userRoutes);
app.use('/api/patient', patientRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'OK',
      service: 'Health checkup API running'
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message
    });
});

const PORT = config.http.port;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
