// // Create a file named `createCollection.js` in your backend directory

// const mongoose = require('mongoose');

// const uri = 'mongodb+srv://rohithgowdamcs21:kBCCVIJBWsHAbXBe@hackathoncluster.dicgaoh.mongodb.net/?retryWrites=true&w=majority&appName=Hackathoncluster';

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');
    
//     const teamSchema = new mongoose.Schema({
//       userEmail: {
//         type: String,
//         required: true,
//         trim: true,
//         match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Basic email validation
//       },
//       teamName: {
//         type: String,
//         required: true,
//         trim: true
//       },
//       teamID: {
//         type: String,
//         required: true,
//         unique: true
//       },
//       person1:{
//         type:String,
//         required:true,
//         unique:false
//       },
//       person2:{
//         type:String,
//         required:true,
//         unique:false
//       },
//       caption1:{
//         type:String,
//         required:true,
//         unique:false
//       },
//       caption2:{
//         type:String,
//         required:true,
//         unique:false
//       },
//       problemStatement: {
//         type: String,
//         required: true
//       }
//     });

//     const Team = mongoose.model('Team', teamSchema);

//     // Insert a sample document
//     const sampleTeam = new Team({
//       userEmail: 'example@example.com',
//       teamName: 'Sample Team',
//       teamID: '12345',
//       problemStatement: 'Sample problem statement',
//       person1:'Test',
//       person2:'Test2',
//       caption1:'Testing 1 2 3',
//       caption2: 'Testing 3 2 1'
//     });

//     sampleTeam.save()
//       .then(() => {
//         console.log('Sample team inserted');
//         mongoose.connection.close();
//       })
//       .catch(err => {
//         console.error('Error inserting sample team:', err);
//         mongoose.connection.close();
//       });
//   })
//   .catch(err => console.error('MongoDB connection error:', err));



const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(session({
  secret: 'My secret key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
}));

app.get('/set-session', (req, res) => {
  req.session.user = { email: 'test@example.com', name: 'Test User' };
  res.send('Session set');
});

app.get('/get-session', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send('No session found');
  }
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
