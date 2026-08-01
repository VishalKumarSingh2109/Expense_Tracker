const { body, param } = require('express-validator');

const createGoalValidation = [
    body('goalName')
        .trim()
        .notEmpty().withMessage('goalName is required')
        .isLength({ min: 2, max: 150 }).withMessage('goalName must be 2-150 characters'),

    body('targetAmount')
        .notEmpty().withMessage('targetAmount is required')
        .isFloat({ gt: 0 }).withMessage('targetAmount must be a number greater than 0'),

    body('targetDate')
        .optional({ checkFalsy: true })
        .isISO8601().withMessage('targetDate must be a valid date (YYYY-MM-DD)'),
];

const updateGoalValidation = [
    param('id').isInt().withMessage('Invalid goal id'),
    ...createGoalValidation,
];

const contributeValidation = [
    param('id').isInt().withMessage('Invalid goal id'),
    body('amount')
        .notEmpty().withMessage('amount is required')
        .isFloat({ gt: 0 }).withMessage('amount must be a number greater than 0'),
];

const idParamValidation = [
    param('id').isInt().withMessage('Invalid goal id'),
];

module.exports = {
    createGoalValidation,
    updateGoalValidation,
    contributeValidation,
    idParamValidation,
};