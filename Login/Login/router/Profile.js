// routes/Profile.js

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Profile</title>
            <link rel="stylesheet" href="/css/profile.css">
        </head>
        <body>
            <h1>Welcome to your profile!</h1>
            <p>Content for logged-in users goes here.</p>
            <form action="/logout" method="post">
                <button type="submit">Logout</button>
            </form>
            <h2>Update Your Information</h2>
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
