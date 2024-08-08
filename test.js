// Create a file named `createCollection.js` in your backend directory

const mongoose = require('mongoose');

const uri = 'mongodb+srv://rohithgowdamcs21:kBCCVIJBWsHAbXBe@hackathoncluster.dicgaoh.mongodb.net/?retryWrites=true&w=majority&appName=Hackathoncluster';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    
    const teamSchema = new mongoose.Schema({
      userEmail: {
        type: String,
        required: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Basic email validation
      },
      teamName: {
        type: String,
        required: true,
        trim: true
      },
      teamID: {
        type: String,
        required: true,
        unique: true
      },
      person1:{
        type:String,
        required:true,
        unique:false
      },
      person2:{
        type:String,
        required:true,
        unique:false
      },
      caption1:{
        type:String,
        required:true,
        unique:false
      },
      caption2:{
        type:String,
        required:true,
        unique:false
      },
      problemStatement: {
        type: String,
        required: true
      }
    });

    const Team = mongoose.model('Team', teamSchema);

    // Insert a sample document
    const sampleTeam = new Team({
      userEmail: 'example@example.com',
      teamName: 'Sample Team',
      teamID: '12345',
      problemStatement: 'Sample problem statement',
      person1:'Test',
      person2:'Test2',
      caption1:'Testing 1 2 3',
      caption2: 'Testing 3 2 1'
    });

    sampleTeam.save()
      .then(() => {
        console.log('Sample team inserted');
        mongoose.connection.close();
      })
      .catch(err => {
        console.error('Error inserting sample team:', err);
        mongoose.connection.close();
      });
  })
  .catch(err => console.error('MongoDB connection error:', err));
