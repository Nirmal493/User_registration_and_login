const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/Users'); // Ensure the correct path
const { generateToken } = require('../utils/jwt');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Register</title>
                <link rel="stylesheet" href="/css/registration.css"> <!-- Adjust path if necessary -->

        </head>
        <body>
            <form action="/register" method="post">
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" required/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" required/>
                </div>
                
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
             <div>
                <p>you have an account? <a href="/">Login here</a></p>
            </div>
        </body>
        </html>
    `);
});

router.post('/', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.send('User already exists. <a href="/register">Try again</a>');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, password: hashedPassword, email });
        await user.save();

        const token = generateToken(user);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send('An error occurred. <a href="/register">Try again</a>');
    }
});

module.exports = router;
