const { pool } = require('../config/db.config');

const BudgetModel = {
    async findByUserMonthYear(userId, month, year) {
        const [rows] = await pool.query(
            `SELECT * FROM budgets WHERE user_id = ? AND month = ? AND year = ? LIMIT 1`,
            [userId, month, year]
        );
        return rows[0] || null;
    },

    async findAllForUser(userId) {
        const [rows] = await pool.query(
            `SELECT * FROM budgets WHERE user_id = ? ORDER BY year DESC, month DESC`,
            [userId]
        );
        return rows;
    },

    async findByIdForUser(id, userId) {
        const [rows] = await pool.query(
            `SELECT * FROM budgets WHERE id = ? AND user_id = ? LIMIT 1`,
            [id, userId]
        );
        return rows[0] || null;
    },

    // Creates a budget, or updates the limit if one already exists
    // for that user/month/year (relies on the unique_user_month key)
    async upsert({ userId, month, year, amountLimit }) {
        await pool.query(
            `INSERT INTO budgets (user_id, month, year, amount_limit)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE amount_limit = VALUES(amount_limit)`,
            [userId, month, year, amountLimit]
        );
        return this.findByUserMonthYear(userId, month, year);
    },

    async updateOwned({ id, userId, amountLimit }) {
        const [result] = await pool.query(
            `UPDATE budgets SET amount_limit = ? WHERE id = ? AND user_id = ?`,
            [amountLimit, id, userId]
        );
        return result.affectedRows > 0;
    },

    async deleteOwned(id, userId) {
        const [result] = await pool.query(
            `DELETE FROM budgets WHERE id = ? AND user_id = ?`,
            [id, userId]
        );
        return result.affectedRows > 0;
    },

    // Total spent (expenses only, excluding soft-deleted) for a given
    // user/month/year - used to compare against the budget limit
    async getTotalSpent(userId, month, year) {
        const [rows] = await pool.query(
            `SELECT COALESCE(SUM(amount), 0) AS total_spent
             FROM transactions
             WHERE user_id = ?
               AND type = 'expense'
               AND is_deleted = 0
               AND MONTH(transaction_date) = ?
               AND YEAR(transaction_date) = ?`,
            [userId, month, year]
        );
        return parseFloat(rows[0].total_spent);
    },
};

module.exports = BudgetModel;