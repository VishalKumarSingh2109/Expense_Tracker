const ReportModel = require('../models/report.model');

const MONTH_NAMES = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const ReportService = {
    async getMonthlySummary(userId, month, year) {
        const rows = await ReportModel.getMonthlySummary(userId, month, year);

        let income = 0;
        let expense = 0;
        for (const row of rows) {
            if (row.type === 'income') income = parseFloat(row.total);
            if (row.type === 'expense') expense = parseFloat(row.total);
        }

        return {
            month,
            year,
            income,
            expense,
            netSavings: income - expense,
        };
    },

    // Returns chart-ready [{ category, total }] array for a pie chart
    async getCategoryBreakdown(userId, month, year, type) {
        const rows = await ReportModel.getCategoryBreakdown(userId, month, year, type);

        return rows.map((row) => ({
            categoryId: row.category_id,
            category: row.category_name,
            total: parseFloat(row.total),
        }));
    },

    // Returns chart-ready [{ label: "Jul 2026", income, expense }]
    // for the last N months, with zero-filled months included so the
    // chart's x-axis never has gaps
    async getMonthlyTrend(userId, monthsCount) {
        const rows = await ReportModel.getMonthlyTrend(userId, monthsCount);

        // Build a lookup: "2026-7" -> { income, expense }
        const dataMap = {};
        for (const row of rows) {
            const key = `${row.year}-${row.month}`;
            if (!dataMap[key]) dataMap[key] = { income: 0, expense: 0 };
            dataMap[key][row.type] = parseFloat(row.total);
        }

        // Walk backwards from the current month to build the full
        // month-by-month series, filling in zeros where there's no data
        const now = new Date();
        const series = [];

        for (let i = monthsCount - 1; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const year = d.getFullYear();
            const month = d.getMonth() + 1; // JS months are 0-indexed
            const key = `${year}-${month}`;
            const entry = dataMap[key] || { income: 0, expense: 0 };

            series.push({
                label: `${MONTH_NAMES[month - 1]} ${year}`,
                month,
                year,
                income: entry.income,
                expense: entry.expense,
                netSavings: entry.income - entry.expense,
            });
        }

        return series;
    },
};

module.exports = ReportService;