const CategoryService = require('../services/category.service');
const { success } = require('../utils/responseHandler');

const CategoryController = {
    async getAll(req, res, next) {
        try {
            const categories = await CategoryService.getAll(req.user.id);
            return success(res, 200, 'Categories fetched successfully', categories);
        } catch (err) {
            next(err);
        }
    },

    async create(req, res, next) {
        try {
            const { name, type } = req.body;
            const category = await CategoryService.create(req.user.id, { name, type });
            return success(res, 201, 'Category created successfully', category);
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const { name, type } = req.body;
            const category = await CategoryService.update(req.user.id, req.params.id, { name, type });
            return success(res, 200, 'Category updated successfully', category);
        } catch (err) {
            next(err);
        }
    },

    async remove(req, res, next) {
        try {
            await CategoryService.remove(req.user.id, req.params.id);
            return success(res, 200, 'Category deleted successfully');
        } catch (err) {
            next(err);
        }
    },
};

module.exports = CategoryController;