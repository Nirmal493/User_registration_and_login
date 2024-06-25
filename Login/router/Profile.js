const express = require('express');
const User = require('../models/Users');
const router = express.Router();

router.get("/", (req, res) => {
    // Assuming you have stored user details in req.user after authentication
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Profile</title>
            <link rel="stylesheet" href="/css/profile.css">
            <style>
                body {
                    background-color: #f0f0f0;
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                    p{
                    background-color:black,
                    text-color:whit}
                h1 {
                    text-align: center;
                    margin-bottom: 20px;
                }
                form {
                    max-width: 400px;
                    margin: 0 auto;
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                form label {
                    font-weight: bold;
                    display: block;
                    margin-bottom: 8px;
                }
                form input[type="email"],
                form input[type="password"] {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 12px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
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
            </style>
        </head>
        <body>
            <h1>Welcome Nirmal</h1>
            <h3>Content for logged-in users goes here.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a ipsum tellus. Aliquam ac tincidunt risus. Nullam nec orci euismod, suscipit enim sed, tempor quam. Sed vitae mi ullamcorper, pulvinar est nec, efficitur risus. Proin nec pharetra ipsum. Integer mattis turpis ac suscipit tempus. Suspendisse potenti. Ut pharetra felis ac tortor interdum, eget scelerisque lorem tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam et quam sem. Aliquam eleifend, erat in mollis dictum, nunc neque malesuada leo, et sodales odio metus sit amet odio. Etiam et venenatis velit, nec eleifend tortor. Phasellus euismod efficitur libero, et tincidunt orci tincidunt eget. Sed fringilla justo ac dolor sodales vehicula.</p>
            
            <form action="/profile/update" method="post">
                <div>
                    <label>New Email:</label>
                    <input type="email" name="email" />
                </div>
                <div>
                    <label>New Password:</label>
                    <input type="password" name="password" />
                </div>
                <div>
                    <button type="submit">Update</button>
                </div>
            </form>
            <form action="/logout" method="post">
                <button type="submit">Logout</button>
            </form>
        </body>
        </html>
    `);
});

module.exports = router;











// const express = require('express');
// const router = express.Router();
// const authenticate = require('../middleware/authenticate');

// router.get("/", authenticate, (req, res) => {
//     res.send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Profile</title>
//             <link rel="stylesheet" href="/css/styles.css">
//         </head>
//         <body>
//             <h1>Welcome to your profile, ${req.user.username}!</h1>
//             <p>Content for logged-in users goes here.</p>
//             <form action="/logout" method="post">
//                 <button type="submit">Logout</button>
//             </form>
//             <h2>Update Your Information</h2>
//             <form action="/profile/update" method="post">
//                 <div>
//                     <label>New Email:</label>
//                     <input type="email" name="email" required/>
//                 </div>
//                 <div>
//                     <label>New Password:</label>
//                     <input type="password" name="password" required/>
//                 </div>
//                 <div>
//                     <button type="submit">Update</button>
//                 </div>
//             </form>
//         </body>
//         </html>
//     `);
// });

// module.exports = router;
