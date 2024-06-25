const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const { generateToken } = require("../utils/jwt");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/css/style.css"> <!-- Adjust path if necessary -->
</head>
        <body>
        <h1>Login Form</h1>
            <form action="/" method="post">
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" required/>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <div>
                <p>Don't have an account? <a href="/register">Register here</a></p>
            </div>
        </body>
        </html>
    `);
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Login</title>
            </head>
            <body>
                <p>Invalid email or password. <a href="/">Try again</a></p>
            </body>
            </html>
        `);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Login</title>
            </head>
            <body>
                <p>Invalid email or password. <a href="/">Try again</a></p>
            </body>
            </html>
        `);
    }

    const token = generateToken(user);
    req.session.token = token;
    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.send('An error occurred. <a href="/">Try again</a>');
  }
});

module.exports = router;
