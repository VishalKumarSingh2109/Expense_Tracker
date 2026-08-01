const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { registerValidation, loginValidation } = require('../validators/auth.validator');

// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerValidation, validate, AuthController.register);

// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginValidation, validate, AuthController.login);

// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', authMiddleware, AuthController.getProfile);

module.exports = router;
