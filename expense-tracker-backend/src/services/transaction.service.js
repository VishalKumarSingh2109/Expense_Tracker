const TransactionModel = require('../models/transaction.model');
const CategoryModel = require('../models/category.model');

// Shared guard: category must exist and must be either a default/global
// category (user_id IS NULL) or belong to this specific user
async function assertCategoryUsable(categoryId, userId) {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
        const err = new Error('Category not found.');
        err.statusCode = 404;
        throw err;
    }
    if (category.user_id !== null && category.user_id !== userId) {
        const err = new Error('You cannot use a category that belongs to another user.');
        err.statusCode = 403;
        throw err;
    }
    return category;
}

const TransactionService = {
    async create(userId, data) {
        await assertCategoryUsable(data.categoryId, userId);

        const id = await TransactionModel.create({
            userId,
            categoryId: data.categoryId,
            type: data.type,
            amount: data.amount,
            description: data.description,
            transactionDate: data.transactionDate,
        });

        return TransactionModel.findByIdForUser(id, userId);
    },

    async getAll(userId, queryParams) {
        const page = parseInt(queryParams.page) || 1;
        const limit = parseInt(queryParams.limit) || 10;

        const filters = {
            type: queryParams.type,
            categoryId: queryParams.categoryId,
            startDate: queryParams.startDate,
            endDate: queryParams.endDate,
            minAmount: queryParams.minAmount,
            maxAmount: queryParams.maxAmount,
            search: queryParams.search,
        };

        const { rows, total } = await TransactionModel.findAllForUser(userId, filters, { page, limit });

        return {
            transactions: rows,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    },

    async getOne(userId, id) {
        const transaction = await TransactionModel.findByIdForUser(id, userId);
        if (!transaction) {
            const err = new Error('Transaction not found.');
            err.statusCode = 404;
            throw err;
        }
        return transaction;
    },

    async update(userId, id, data) {
        await assertCategoryUsable(data.categoryId, userId);

        const updated = await TransactionModel.updateOwned({
            id,
            userId,
            categoryId: data.categoryId,
            type: data.type,
            amount: data.amount,
            description: data.description,
            transactionDate: data.transactionDate,
        });

        if (!updated) {
            const err = new Error('Transaction not found.');
            err.statusCode = 404;
            throw err;
        }

        return TransactionModel.findByIdForUser(id, userId);
    },

    async remove(userId, id) {
        const deleted = await TransactionModel.softDeleteOwned(id, userId);
        if (!deleted) {
            const err = new Error('Transaction not found.');
            err.statusCode = 404;
            throw err;
        }
    },
};

module.exports = TransactionService;