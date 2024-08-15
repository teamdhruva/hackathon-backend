const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

router.post('/login', async (req, res) => {
  const { userEmail, teamName } = req.body;

  if (!userEmail || !teamName) {
    return res.status(400).json({ message: 'User email and team name are required' });
  }
  try {
    // Find the team by userEmail and teamName
    const team = await Team.findOne({ userEmail, teamName });
    if (team) {
      req.session.user={email:team.userEmail, name:team.teamName};
      res.status(200).json({ message: 'Login successful', team });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/logout',(req,res)=>{
  console.log(req.session.user)
  req.session.destroy((err)=>{
    if(err){
      console.log(err);
      res.status(500).send('Error logging out');
    }
    else{
      res.status(200).send('Logged out');
    }
  })
})

module.exports = router;
