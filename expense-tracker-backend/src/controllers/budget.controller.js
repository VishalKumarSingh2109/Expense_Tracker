const BudgetService = require('../services/budget.service');
const { success } = require('../utils/responseHandler');

const BudgetController = {
    async setBudget(req, res, next) {
        try {
            const { month, year, amountLimit } = req.body;
            const budget = await BudgetService.setBudget(req.user.id, { month, year, amountLimit });
            return success(res, 201, 'Budget set successfully', budget);
        } catch (err) {
            next(err);
        }
    },

    async getAll(req, res, next) {
        try {
            const budgets = await BudgetService.getAll(req.user.id);
            return success(res, 200, 'Budgets fetched successfully', budgets);
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const { amountLimit } = req.body;
            const budget = await BudgetService.update(req.user.id, req.params.id, { amountLimit });
            return success(res, 200, 'Budget updated successfully', budget);
        } catch (err) {
            next(err);
        }
    },

    async remove(req, res, next) {
        try {
            await BudgetService.remove(req.user.id, req.params.id);
            return success(res, 200, 'Budget deleted successfully');
        } catch (err) {
            next(err);
        }
    },

    // GET /api/budgets/status?month=7&year=2026
    async getStatus(req, res, next) {
        try {
            const month = parseInt(req.query.month);
            const year = parseInt(req.query.year);
            const status = await BudgetService.getStatus(req.user.id, month, year);
            return success(res, 200, 'Budget status fetched successfully', status);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = BudgetController;