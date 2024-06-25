const { verifyToken } = require('../utils/jwt.js');

function authenticate(req, res, next) {
    const token = req.cookies['token']; // Assuming token is stored as a cookie
    if (!token) {
        return res.status(403).send('No token provided');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).send('Invalid token');
    }

    req.user = decoded;
    next();
}

module.exports = authenticate;
