const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const teamRoutes = require('./routes/teams');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/teams', teamRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://rohithgowdamcs21:kBCCVIJBWsHAbXBe@hackathoncluster.dicgaoh.mongodb.net/?retryWrites=true&w=majority&appName=Hackathoncluster', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
