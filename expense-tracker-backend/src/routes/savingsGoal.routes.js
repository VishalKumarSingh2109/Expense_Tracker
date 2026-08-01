const express = require('express');
const router = express.Router();

const SavingsGoalController = require('../controllers/savingsGoal.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
    createGoalValidation,
    updateGoalValidation,
    contributeValidation,
    idParamValidation,
} = require('../validators/savingsGoal.validator');

// All savings goal routes require a logged-in user
router.use(authMiddleware);

// @route   GET /api/savings-goals
router.get('/', SavingsGoalController.getAll);

// @route   POST /api/savings-goals
router.post('/', createGoalValidation, validate, SavingsGoalController.create);

// @route   GET /api/savings-goals/:id
router.get('/:id', idParamValidation, validate, SavingsGoalController.getOne);

// @route   PUT /api/savings-goals/:id
router.put('/:id', updateGoalValidation, validate, SavingsGoalController.update);

// @route   POST /api/savings-goals/:id/contribute
router.post('/:id/contribute', contributeValidation, validate, SavingsGoalController.contribute);

// @route   DELETE /api/savings-goals/:id
router.delete('/:id', idParamValidation, validate, SavingsGoalController.remove);

module.exports = router;