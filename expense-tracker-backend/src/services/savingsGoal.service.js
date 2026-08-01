const SavingsGoalModel = require('../models/savingsGoal.model');

const SavingsGoalService = {
    async create(userId, { goalName, targetAmount, targetDate }) {
        const id = await SavingsGoalModel.create({ userId, goalName, targetAmount, targetDate });
        return SavingsGoalModel.findByIdForUser(id, userId);
    },

    async getAll(userId) {
        return SavingsGoalModel.findAllForUser(userId);
    },

    async getOne(userId, id) {
        const goal = await SavingsGoalModel.findByIdForUser(id, userId);
        if (!goal) {
            const err = new Error('Savings goal not found.');
            err.statusCode = 404;
            throw err;
        }
        return goal;
    },

    async update(userId, id, { goalName, targetAmount, targetDate }) {
        const updated = await SavingsGoalModel.updateOwned({ id, userId, goalName, targetAmount, targetDate });
        if (!updated) {
            const err = new Error('Savings goal not found.');
            err.statusCode = 404;
            throw err;
        }
        return SavingsGoalModel.findByIdForUser(id, userId);
    },

    // Dedicated "contribute" action - separate from update, since
    // adding money is a distinct action from editing goal details.
    // Also handles auto-marking the goal 'completed' when funded.
    async contribute(userId, id, amount) {
        const goal = await SavingsGoalModel.findByIdForUser(id, userId);
        if (!goal) {
            const err = new Error('Savings goal not found.');
            err.statusCode = 404;
            throw err;
        }
        if (goal.status === 'completed') {
            const err = new Error('This goal is already completed.');
            err.statusCode = 400;
            throw err;
        }

        await SavingsGoalModel.contribute({ id, userId, amount });
        return SavingsGoalModel.findByIdForUser(id, userId);
    },

    async remove(userId, id) {
        const deleted = await SavingsGoalModel.deleteOwned(id, userId);
        if (!deleted) {
            const err = new Error('Savings goal not found.');
            err.statusCode = 404;
            throw err;
        }
    },
};

module.exports = SavingsGoalService;