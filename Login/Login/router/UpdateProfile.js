const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.user.username, { email, password: hashedPassword });
    res.send('Profile updated successfully. <a href="/profile">Go back to profile</a>');
  } catch (err) {
    console.error(err);
    res.send('An error occurred. <a href="/profile">Try again</a>');
  }
});

module.exports = router;
