// Create a file named `createCollection.js` in your backend directory

const mongoose = require('mongoose');

const uri = 'mongodb+srv://rohithgowdamcs21:kBCCVIJBWsHAbXBe@hackathoncluster.dicgaoh.mongodb.net/?retryWrites=true&w=majority&appName=Hackathoncluster';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    
    const teamSchema = new mongoose.Schema({
      userEmail: String,
      teamName: String,
      teamID: String,
      problemStatement: String
    });

    const Team = mongoose.model('Team', teamSchema);

    // Insert a sample document
    const sampleTeam = new Team({
      userEmail: 'example@example.com',
      teamName: 'Sample Team',
      teamID: '12345',
      problemStatement: 'Sample problem statement'
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
