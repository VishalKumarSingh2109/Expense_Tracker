const { pool } = require('../config/db.config');

const ReportModel = {
    // Total income, total expense for a given month/year
    async getMonthlySummary(userId, month, year) {
        const [rows] = await pool.query(
            `SELECT
                type,
                COALESCE(SUM(amount), 0) AS total
             FROM transactions
             WHERE user_id = ?
               AND is_deleted = 0
               AND MONTH(transaction_date) = ?
               AND YEAR(transaction_date) = ?
             GROUP BY type`,
            [userId, month, year]
        );
        return rows;
    },

    // Spending/earning grouped by category for a given month/year + type
    async getCategoryBreakdown(userId, month, year, type) {
        const [rows] = await pool.query(
            `SELECT
                c.id AS category_id,
                c.name AS category_name,
                COALESCE(SUM(t.amount), 0) AS total
             FROM transactions t
             JOIN categories c ON t.category_id = c.id
             WHERE t.user_id = ?
               AND t.is_deleted = 0
               AND t.type = ?
               AND MONTH(t.transaction_date) = ?
               AND YEAR(t.transaction_date) = ?
             GROUP BY c.id, c.name
             ORDER BY total DESC`,
            [userId, type, month, year]
        );
        return rows;
    },

    // Income vs expense totals per month, for the last N months
    // (including the current month), oldest first - ready for a line/bar chart
    async getMonthlyTrend(userId, monthsCount) {
        const [rows] = await pool.query(
            `SELECT
                YEAR(transaction_date) AS year,
                MONTH(transaction_date) AS month,
                type,
                COALESCE(SUM(amount), 0) AS total
             FROM transactions
             WHERE user_id = ?
               AND is_deleted = 0
               AND transaction_date >= DATE_SUB(
                     DATE_FORMAT(CURDATE(), '%Y-%m-01'),
                     INTERVAL ? MONTH
                   )
             GROUP BY YEAR(transaction_date), MONTH(transaction_date), type
             ORDER BY year ASC, month ASC`,
            [userId, monthsCount - 1]
        );
        return rows;
    },
};

module.exports = ReportModel;