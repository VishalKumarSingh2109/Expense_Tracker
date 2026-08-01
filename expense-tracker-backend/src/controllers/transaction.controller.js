const TransactionService = require('../services/transaction.service');
const { success } = require('../utils/responseHandler');

const TransactionController = {
    async create(req, res, next) {
        try {
            const transaction = await TransactionService.create(req.user.id, req.body);
            return success(res, 201, 'Transaction created successfully', transaction);
        } catch (err) {
            next(err);
        }
    },

    async getAll(req, res, next) {
        try {
            const result = await TransactionService.getAll(req.user.id, req.query);
            return success(res, 200, 'Transactions fetched successfully', result);
        } catch (err) {
            next(err);
        }
    },

    async getOne(req, res, next) {
        try {
            const transaction = await TransactionService.getOne(req.user.id, req.params.id);
            return success(res, 200, 'Transaction fetched successfully', transaction);
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const transaction = await TransactionService.update(req.user.id, req.params.id, req.body);
            return success(res, 200, 'Transaction updated successfully', transaction);
        } catch (err) {
            next(err);
        }
    },

    async remove(req, res, next) {
        try {
            await TransactionService.remove(req.user.id, req.params.id);
            return success(res, 200, 'Transaction deleted successfully');
        } catch (err) {
            next(err);
        }
    },
};

module.exports = TransactionController;