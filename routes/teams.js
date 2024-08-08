// hackathon-backend/routes/teams.js
const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Create a new team
router.post('/new', async (req, res) => {
  const { userEmail, teamName, teamID, problemStatement,person1,preson2,caption1,caption2 } = req.body;
  try {
    const team = new Team({ userEmail, teamName, teamID, problemStatement,person1,preson2,caption1,caption2});
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all teams
router.get('/get', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
