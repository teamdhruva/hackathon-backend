const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var session=require('express-session')
const MongoStore = require('connect-mongo');
const path=require('path')
require('dotenv').config();
const teamRoutes = require('./routes/teams');
const authRoutes = require('./routes/auth');
const downloadRouter = require('./routes/download');
const imagesRouter = require('./routes/images');


const app = express();
app.use('/images', express.static(path.join(__dirname, 'images')));


//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  app.use(session({
    secret: 'My secret key',
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({mongoUrl:process.env.MONGODB_URI}),
    cookie:{secure:false,maxAge:1000*60*60*24}
  }));


//routes
app.use('/api/teams', teamRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/download', downloadRouter);
app.use('/api/images',imagesRouter);
app.get('/get-session', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send('No session found');
  }
});
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
