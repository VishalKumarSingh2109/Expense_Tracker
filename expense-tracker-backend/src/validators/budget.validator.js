const { body, param, query } = require('express-validator');

const setBudgetValidation = [
    body('month')
        .notEmpty().withMessage('month is required')
        .isInt({ min: 1, max: 12 }).withMessage('month must be between 1-12'),

    body('year')
        .notEmpty().withMessage('year is required')
        .isInt({ min: 2000, max: 2100 }).withMessage('year must be a valid year'),

    body('amountLimit')
        .notEmpty().withMessage('amountLimit is required')
        .isFloat({ gt: 0 }).withMessage('amountLimit must be a number greater than 0'),
];

const updateBudgetValidation = [
    param('id').isInt().withMessage('Invalid budget id'),
    body('amountLimit')
        .notEmpty().withMessage('amountLimit is required')
        .isFloat({ gt: 0 }).withMessage('amountLimit must be a number greater than 0'),
];

const idParamValidation = [
    param('id').isInt().withMessage('Invalid budget id'),
];

const statusQueryValidation = [
    query('month')
        .notEmpty().withMessage('month is required')
        .isInt({ min: 1, max: 12 }).withMessage('month must be between 1-12'),
    query('year')
        .notEmpty().withMessage('year is required')
        .isInt({ min: 2000, max: 2100 }).withMessage('year must be a valid year'),
];

module.exports = {
    setBudgetValidation,
    updateBudgetValidation,
    idParamValidation,
    statusQueryValidation,
};