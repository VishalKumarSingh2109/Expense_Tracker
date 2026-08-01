const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { error } = require('../utils/responseHandler');

// Protects routes - verifies the JWT sent in the Authorization header
// and attaches the decoded user info to req.user for downstream use.
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return error(res, 401, 'No token provided. Access denied.');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded; // { id, email }
        next();
    } catch (err) {
        return error(res, 401, 'Invalid or expired token.');
    }
}

module.exports = authMiddleware;
