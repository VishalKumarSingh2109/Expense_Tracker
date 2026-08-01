const jwt = require('jsonwebtoken');
const env = require('../config/env');

// Payload only ever contains the user's id + email -
// never put the password hash in here
function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN }
    );
}

module.exports = generateToken;
