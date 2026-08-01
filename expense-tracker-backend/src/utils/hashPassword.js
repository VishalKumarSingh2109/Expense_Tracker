const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

// Hash a plain text password before saving to DB
async function hashPassword(plainPassword) {
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

// Compare plain text password (login attempt) with stored hash
async function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { hashPassword, comparePassword };
