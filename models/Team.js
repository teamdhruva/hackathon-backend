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

module.exports = mongoose.model('Team', TeamSchema);
