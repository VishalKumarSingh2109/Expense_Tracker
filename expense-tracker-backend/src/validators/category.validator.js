const { body, param } = require('express-validator');

const createCategoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),

    body('type')
        .notEmpty().withMessage('Type is required')
        .isIn(['income', 'expense']).withMessage('Type must be either income or expense'),
];

const updateCategoryValidation = [
    param('id').isInt().withMessage('Invalid category id'),
    ...createCategoryValidation,
];

const idParamValidation = [
    param('id').isInt().withMessage('Invalid category id'),
];

module.exports = {
    createCategoryValidation,
    updateCategoryValidation,
    idParamValidation,
};