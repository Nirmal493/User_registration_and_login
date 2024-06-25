const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const register = require('./router/Registration');
const login = require('./router/Login.jsx');
const authenticate = require('./middleware/authenticate');
const profile = require('./router/Profile');
const logout = require('./router/Logout.jsx');
const updateProfile = require('./router/UpdateProfile');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'qwertyuiop',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
mongoose.connect('mongodb+srv://m29k599471:1234567890@cluster0.xcwhlj6.mongodb.net/?retryWrites=true')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

app.use('/register', register);

app.use('/logout', logout);
app.use('/profile', profile);
app.use('/profile/update', updateProfile);

// app.get('/protected', authenticate, (req, res) => {
//     res.send(`Hello, ${req.user.username}! This is a protected route.`);
// });
app.use('/', login);

app.listen(5000, () => {
    console.log("Server started on http://localhost:5000");
});













// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require("mongoose");
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const path = require('path');

// const register = require('./router/Registration.js');
// const login = require("./router/Login.jsx");
// const authenticate = require('./middleware/auth');
// const profile = require('./router/Profile.js');
// const logout = require("./router/Logout.jsx");
// const updateProfile = require('./router/UpdateProfile');


// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// mongoose.connect('mongodb+srv://m29k599471:1234567890@cluster0.xcwhlj6.mongodb.net/?retryWrites=true')
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.error('Error connecting to MongoDB:', err.message));


// app.use('/register', register);

// app.get('/protected', authenticate, (req, res) => {
//     res.send(`Hello, ${req.user.username}! This is a protected route.`);
// });
// app.use('/logout', logout);
// app.use("/profile", profile);
// app.use('/profile/update', updateProfile);
// app.use('/', login);


// app.listen(5000, () => {
//     console.log("Session started !")
// })