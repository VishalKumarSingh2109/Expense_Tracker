const { body, param, query } = require('express-validator');

const createTransactionValidation = [
    body('categoryId')
        .notEmpty().withMessage('categoryId is required')
        .isInt().withMessage('categoryId must be a number'),

    body('type')
        .notEmpty().withMessage('type is required')
        .isIn(['income', 'expense']).withMessage('type must be either income or expense'),

    body('amount')
        .notEmpty().withMessage('amount is required')
        .isFloat({ gt: 0 }).withMessage('amount must be a number greater than 0'),

    body('description')
        .optional({ checkFalsy: true })
        .isLength({ max: 255 }).withMessage('description must be under 255 characters'),

    body('transactionDate')
        .notEmpty().withMessage('transactionDate is required')
        .isISO8601().withMessage('transactionDate must be a valid date (YYYY-MM-DD)'),
];

const updateTransactionValidation = [
    param('id').isInt().withMessage('Invalid transaction id'),
    ...createTransactionValidation,
];

const idParamValidation = [
    param('id').isInt().withMessage('Invalid transaction id'),
];

const listQueryValidation = [
    query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be 1-100'),
    query('type').optional().isIn(['income', 'expense']).withMessage('type must be income or expense'),
    query('categoryId').optional().isInt().withMessage('categoryId must be a number'),
    query('startDate').optional().isISO8601().withMessage('startDate must be a valid date'),
    query('endDate').optional().isISO8601().withMessage('endDate must be a valid date'),
    query('minAmount').optional().isFloat({ min: 0 }).withMessage('minAmount must be a positive number'),
    query('maxAmount').optional().isFloat({ min: 0 }).withMessage('maxAmount must be a positive number'),
];

module.exports = {
    createTransactionValidation,
    updateTransactionValidation,
    idParamValidation,
    listQueryValidation,
};