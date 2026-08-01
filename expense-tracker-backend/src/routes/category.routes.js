const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
    createCategoryValidation,
    updateCategoryValidation,
    idParamValidation,
} = require('../validators/category.validator');

// All category routes require a logged-in user
router.use(authMiddleware);

// @route   GET /api/categories
router.get('/', CategoryController.getAll);

// @route   POST /api/categories
router.post('/', createCategoryValidation, validate, CategoryController.create);

// @route   PUT /api/categories/:id
router.put('/:id', updateCategoryValidation, validate, CategoryController.update);

// @route   DELETE /api/categories/:id
router.delete('/:id', idParamValidation, validate, CategoryController.remove);

module.exports = router;