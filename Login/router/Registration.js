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
            // <link rel="stylesheet" href="/css/registration.css">
            <style>
        
               body {
        background-image: url('/images/background.png');
        background-size: cover;
        background-repeat: no-repeat;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial, sans-serif;
    }

    h1 {
        text-align: center; /* Center-align the heading */
        color: #333; /* Dark gray color */
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* Add a subtle shadow */
        margin-bottom: 20px; /* Provide some bottom margin */
    }

    form {
        background: rgba(255, 255, 255, 0.8);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 100%;
    }
                form label {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                form input[type="text"],
                form input[type="email"],
                form input[type="password"],
                form input[type="tel"] {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
                    font-size: 16px;
                }
                form button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }
                form button:hover {
                    background-color: #45a049;
                }
                .login-link {
                    text-align: center;
                    margin-top: 10px;
                }
                .login-link a {
                    color: #007bff;
                    text-decoration: none;
                }
                .login-link a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
        <h1>User Registration Form</h1>
            <form action="/register" method="post">
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" required/>
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" required/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" minlength="8" required/>
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input type="tel" name="mobile" pattern="[0-9]{10}" required/>
                    <small>Format: 1234567890</small>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
            <div class="login-link">
                <p>Already have an account? <a href="/">Login here</a></p>
            </div>
        </body>
        </html>
    `);
});

router.post('/', async (req, res) => {
    const { username, name, password, email, mobile } = req.body;

    if (password.length < 8) {
        return res.send('Password should be at least 8 characters long. <a href="/register">Try again</a>');
    }


    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.send('User already exists. <a href="/register">Try again</a>');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, name, password: hashedPassword, email, mobile });
        await user.save();

        const token = generateToken(user);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send('An error occurred. <a href="/register">Try again</a>');
    }
});

module.exports = router;
