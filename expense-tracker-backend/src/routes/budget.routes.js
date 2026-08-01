const express = require('express');
const router = express.Router();

const BudgetController = require('../controllers/budget.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
    setBudgetValidation,
    updateBudgetValidation,
    idParamValidation,
    statusQueryValidation,
} = require('../validators/budget.validator');

// All budget routes require a logged-in user
router.use(authMiddleware);

// @route   GET /api/budgets/status?month=7&year=2026
// IMPORTANT: this must be declared BEFORE /:id, otherwise Express
// would try to match "status" as an :id param
router.get('/status', statusQueryValidation, validate, BudgetController.getStatus);

// @route   GET /api/budgets
router.get('/', BudgetController.getAll);

// @route   POST /api/budgets  (creates, or updates if that month/year already has one)
router.post('/', setBudgetValidation, validate, BudgetController.setBudget);

// @route   PUT /api/budgets/:id
router.put('/:id', updateBudgetValidation, validate, BudgetController.update);

// @route   DELETE /api/budgets/:id
router.delete('/:id', idParamValidation, validate, BudgetController.remove);

module.exports = router;