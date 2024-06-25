const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET;

function generateToken(user) {
    const payload = { username: user.username, email: user.email };
    return jwt.sign(payload, secret, { expiresIn: '30d' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};
