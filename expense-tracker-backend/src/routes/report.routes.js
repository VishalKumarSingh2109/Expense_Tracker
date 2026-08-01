const express = require('express');
const router = express.Router();

const ReportController = require('../controllers/report.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
    summaryValidation,
    categoryBreakdownValidation,
    trendValidation,
} = require('../validators/report.validator');

// All report routes require a logged-in user
router.use(authMiddleware);

// @route   GET /api/reports/summary?month=7&year=2026
router.get('/summary', summaryValidation, validate, ReportController.getSummary);

// @route   GET /api/reports/category-breakdown?month=7&year=2026&type=expense
router.get('/category-breakdown', categoryBreakdownValidation, validate, ReportController.getCategoryBreakdown);

// @route   GET /api/reports/trend?months=6
router.get('/trend', trendValidation, validate, ReportController.getTrend);

module.exports = router;