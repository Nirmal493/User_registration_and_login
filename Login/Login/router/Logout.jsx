// routes/Logout.js

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/profile");
    }
    res.clearCookie("connect.sid"); // Adjust this if using a different session cookie name
    res.redirect("/");
  });
});

module.exports = router;
