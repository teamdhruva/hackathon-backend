const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
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
  problemStatement: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Team', TeamSchema);
