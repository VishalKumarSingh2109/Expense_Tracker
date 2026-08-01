const ReportService = require('../services/report.service');
const { success } = require('../utils/responseHandler');

const ReportController = {
    // GET /api/reports/summary?month=7&year=2026
    async getSummary(req, res, next) {
        try {
            const month = parseInt(req.query.month);
            const year = parseInt(req.query.year);
            const summary = await ReportService.getMonthlySummary(req.user.id, month, year);
            return success(res, 200, 'Monthly summary fetched successfully', summary);
        } catch (err) {
            next(err);
        }
    },

    // GET /api/reports/category-breakdown?month=7&year=2026&type=expense
    async getCategoryBreakdown(req, res, next) {
        try {
            const month = parseInt(req.query.month);
            const year = parseInt(req.query.year);
            const { type } = req.query;
            const breakdown = await ReportService.getCategoryBreakdown(req.user.id, month, year, type);
            return success(res, 200, 'Category breakdown fetched successfully', breakdown);
        } catch (err) {
            next(err);
        }
    },

    // GET /api/reports/trend?months=6  (defaults to 6 if not passed)
    async getTrend(req, res, next) {
        try {
            const months = parseInt(req.query.months) || 6;
            const trend = await ReportService.getMonthlyTrend(req.user.id, months);
            return success(res, 200, 'Monthly trend fetched successfully', trend);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = ReportController;