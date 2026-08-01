const CategoryModel = require('../models/category.model');

const CategoryService = {
    async getAll(userId) {
        return CategoryModel.findAllForUser(userId);
    },

    async create(userId, { name, type }) {
        const categoryId = await CategoryModel.create({ userId, name, type });
        return { id: categoryId, user_id: userId, name, type };
    },

    async update(userId, categoryId, { name, type }) {
        // Guard: make sure this category exists and actually belongs
        // to the user (not a default/global one) before attempting update
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            const err = new Error('Category not found.');
            err.statusCode = 404;
            throw err;
        }
        if (category.user_id !== userId) {
            const err = new Error('You can only edit your own custom categories.');
            err.statusCode = 403;
            throw err;
        }

        await CategoryModel.updateOwned({ id: categoryId, userId, name, type });
        return { id: categoryId, user_id: userId, name, type };
    },

    async remove(userId, categoryId) {
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            const err = new Error('Category not found.');
            err.statusCode = 404;
            throw err;
        }
        if (category.user_id !== userId) {
            const err = new Error('You can only delete your own custom categories.');
            err.statusCode = 403;
            throw err;
        }

        const deleted = await CategoryModel.deleteOwned({ id: categoryId, userId });
        if (!deleted) {
            const err = new Error('Category could not be deleted.');
            err.statusCode = 400;
            throw err;
        }
    },
};

module.exports = CategoryService;