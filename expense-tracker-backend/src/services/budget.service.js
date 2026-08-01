const BudgetModel = require('../models/budget.model');

// Simple two-tier alert system, as decided:
// under 80%  -> "ok"
// 80% - 99%  -> "warning"
// 100%+      -> "exceeded"
function getAlertLevel(percentUsed) {
    if (percentUsed >= 100) return 'exceeded';
    if (percentUsed >= 80) return 'warning';
    return 'ok';
}

const BudgetService = {
    async setBudget(userId, { month, year, amountLimit }) {
        return BudgetModel.upsert({ userId, month, year, amountLimit });
    },

    async getAll(userId) {
        return BudgetModel.findAllForUser(userId);
    },

    async update(userId, budgetId, { amountLimit }) {
        const updated = await BudgetModel.updateOwned({ id: budgetId, userId, amountLimit });
        if (!updated) {
            const err = new Error('Budget not found.');
            err.statusCode = 404;
            throw err;
        }
        return BudgetModel.findByIdForUser(budgetId, userId);
    },

    async remove(userId, budgetId) {
        const deleted = await BudgetModel.deleteOwned(budgetId, userId);
        if (!deleted) {
            const err = new Error('Budget not found.');
            err.statusCode = 404;
            throw err;
        }
    },

    // The core "smart alert" feature - compares actual spending
    // against the set budget limit for a given month/year
    async getStatus(userId, month, year) {
        const budget = await BudgetModel.findByUserMonthYear(userId, month, year);
        const spent = await BudgetModel.getTotalSpent(userId, month, year);

        if (!budget) {
            return {
                budgetSet: false,
                month,
                year,
                limit: null,
                spent,
                remaining: null,
                percentUsed: null,
                alertLevel: null,
                message: 'No budget set for this month yet.',
            };
        }

        const limit = parseFloat(budget.amount_limit);
        const remaining = limit - spent;
        const percentUsed = limit > 0 ? Math.round((spent / limit) * 10000) / 100 : 0;
        const alertLevel = getAlertLevel(percentUsed);

        return {
            budgetSet: true,
            budgetId: budget.id,
            month,
            year,
            limit,
            spent,
            remaining,
            percentUsed,
            alertLevel,
        };
    },
};

module.exports = BudgetService;