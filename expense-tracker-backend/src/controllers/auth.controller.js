const AuthService = require('../services/auth.service');
const UserModel = require('../models/user.model');
const { success } = require('../utils/responseHandler');

const AuthController = {
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const result = await AuthService.register({ name, email, password });
            return success(res, 201, 'Account created successfully', result);
        } catch (err) {
            next(err);
        }
    },

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.login({ email, password });
            return success(res, 200, 'Login successful', result);
        } catch (err) {
            next(err);
        }
    },

    // Returns the logged-in user's own profile - proves the JWT
    // middleware + req.user wiring works end to end
    async getProfile(req, res, next) {
        try {
            const user = await UserModel.findById(req.user.id);
            return success(res, 200, 'Profile fetched successfully', user);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = AuthController;
