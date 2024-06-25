const mongoose = require('mongoose');

// Function to validate password strength
const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: validatePassword,
            message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
