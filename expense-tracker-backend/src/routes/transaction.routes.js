const express = require('express');
const router = express.Router();

const TransactionController = require('../controllers/transaction.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
    createTransactionValidation,
    updateTransactionValidation,
    idParamValidation,
    listQueryValidation,
} = require('../validators/transaction.validator');

// All transaction routes require a logged-in user
router.use(authMiddleware);

// @route   GET /api/transactions?page=1&limit=10&type=expense&categoryId=2&startDate=&endDate=&minAmount=&maxAmount=&search=
router.get('/', listQueryValidation, validate, TransactionController.getAll);

// @route   POST /api/transactions
router.post('/', createTransactionValidation, validate, TransactionController.create);

// @route   GET /api/transactions/:id
router.get('/:id', idParamValidation, validate, TransactionController.getOne);

// @route   PUT /api/transactions/:id
router.put('/:id', updateTransactionValidation, validate, TransactionController.update);

// @route   DELETE /api/transactions/:id  (soft delete)
router.delete('/:id', idParamValidation, validate, TransactionController.remove);

module.exports = router;