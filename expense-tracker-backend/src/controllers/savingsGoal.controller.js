const SavingsGoalService = require('../services/savingsGoal.service');
const { success } = require('../utils/responseHandler');

const SavingsGoalController = {
    async create(req, res, next) {
        try {
            const { goalName, targetAmount, targetDate } = req.body;
            const goal = await SavingsGoalService.create(req.user.id, { goalName, targetAmount, targetDate });
            return success(res, 201, 'Savings goal created successfully', goal);
        } catch (err) {
            next(err);
        }
    },

    async getAll(req, res, next) {
        try {
            const goals = await SavingsGoalService.getAll(req.user.id);
            return success(res, 200, 'Savings goals fetched successfully', goals);
        } catch (err) {
            next(err);
        }
    },

    async getOne(req, res, next) {
        try {
            const goal = await SavingsGoalService.getOne(req.user.id, req.params.id);
            return success(res, 200, 'Savings goal fetched successfully', goal);
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const { goalName, targetAmount, targetDate } = req.body;
            const goal = await SavingsGoalService.update(req.user.id, req.params.id, { goalName, targetAmount, targetDate });
            return success(res, 200, 'Savings goal updated successfully', goal);
        } catch (err) {
            next(err);
        }
    },

    async contribute(req, res, next) {
        try {
            const { amount } = req.body;
            const goal = await SavingsGoalService.contribute(req.user.id, req.params.id, amount);
            return success(res, 200, 'Contribution added successfully', goal);
        } catch (err) {
            next(err);
        }
    },

    async remove(req, res, next) {
        try {
            await SavingsGoalService.remove(req.user.id, req.params.id);
            return success(res, 200, 'Savings goal deleted successfully');
        } catch (err) {
            next(err);
        }
    },
};

module.exports = SavingsGoalController;