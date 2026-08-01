const UserModel = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken');

const AuthService = {
    async register({ name, email, password }) {
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            const err = new Error('An account with this email already exists.');
            err.statusCode = 409;
            throw err;
        }

        const passwordHash = await hashPassword(password);
        const userId = await UserModel.create({ name, email, passwordHash });

        const user = { id: userId, email };
        const token = generateToken(user);

        return {
            token,
            user: { id: userId, name, email },
        };
    },

    async login({ email, password }) {
        const user = await UserModel.findByEmail(email);
        if (!user) {
            const err = new Error('Invalid email or password.');
            err.statusCode = 401;
            throw err;
        }

        const isMatch = await comparePassword(password, user.password_hash);
        if (!isMatch) {
            const err = new Error('Invalid email or password.');
            err.statusCode = 401;
            throw err;
        }

        const token = generateToken(user);

        return {
            token,
            user: { id: user.id, name: user.name, email: user.email },
        };
    },
};

module.exports = AuthService;
