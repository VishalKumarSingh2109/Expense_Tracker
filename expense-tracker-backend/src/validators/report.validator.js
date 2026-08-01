const { query } = require('express-validator');

const summaryValidation = [
    query('month')
        .notEmpty().withMessage('month is required')
        .isInt({ min: 1, max: 12 }).withMessage('month must be between 1-12'),
    query('year')
        .notEmpty().withMessage('year is required')
        .isInt({ min: 2000, max: 2100 }).withMessage('year must be a valid year'),
];

const categoryBreakdownValidation = [
    query('month')
        .notEmpty().withMessage('month is required')
        .isInt({ min: 1, max: 12 }).withMessage('month must be between 1-12'),
    query('year')
        .notEmpty().withMessage('year is required')
        .isInt({ min: 2000, max: 2100 }).withMessage('year must be a valid year'),
    query('type')
        .notEmpty().withMessage('type is required')
        .isIn(['income', 'expense']).withMessage('type must be either income or expense'),
];

const trendValidation = [
    query('months')
        .optional()
        .isInt({ min: 1, max: 24 }).withMessage('months must be between 1-24'),
];

module.exports = {
    summaryValidation,
    categoryBreakdownValidation,
    trendValidation,
};