const { pool } = require('../config/db.config');

const TransactionModel = {
    async create({ userId, categoryId, type, amount, description, transactionDate }) {
        const [result] = await pool.query(
            `INSERT INTO transactions (user_id, category_id, type, amount, description, transaction_date)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, categoryId, type, amount, description || null, transactionDate]
        );
        return result.insertId;
    },

    async findByIdForUser(id, userId) {
        const [rows] = await pool.query(
            `SELECT t.*, c.name AS category_name
             FROM transactions t
             JOIN categories c ON t.category_id = c.id
             WHERE t.id = ? AND t.user_id = ? AND t.is_deleted = 0
             LIMIT 1`,
            [id, userId]
        );
        return rows[0] || null;
    },

    // Builds a dynamic WHERE clause based on whichever filters were passed.
    // Used by both the list query and the count query so pagination totals
    // always match what's actually being returned.
    _buildFilters(userId, filters) {
        const conditions = ['t.user_id = ?', 't.is_deleted = 0'];
        const params = [userId];

        if (filters.type) {
            conditions.push('t.type = ?');
            params.push(filters.type);
        }
        if (filters.categoryId) {
            conditions.push('t.category_id = ?');
            params.push(filters.categoryId);
        }
        if (filters.startDate) {
            conditions.push('t.transaction_date >= ?');
            params.push(filters.startDate);
        }
        if (filters.endDate) {
            conditions.push('t.transaction_date <= ?');
            params.push(filters.endDate);
        }
        if (filters.minAmount) {
            conditions.push('t.amount >= ?');
            params.push(filters.minAmount);
        }
        if (filters.maxAmount) {
            conditions.push('t.amount <= ?');
            params.push(filters.maxAmount);
        }
        if (filters.search) {
            conditions.push('t.description LIKE ?');
            params.push(`%${filters.search}%`);
        }

        return { where: conditions.join(' AND '), params };
    },

    async findAllForUser(userId, filters, { page, limit }) {
        const { where, params } = this._buildFilters(userId, filters);
        const offset = (page - 1) * limit;

        const [rows] = await pool.query(
            `SELECT t.id, t.user_id, t.category_id, c.name AS category_name,
                    t.type, t.amount, t.description, t.transaction_date,
                    t.created_at
             FROM transactions t
             JOIN categories c ON t.category_id = c.id
             WHERE ${where}
             ORDER BY t.transaction_date DESC, t.id DESC
             LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        const [countRows] = await pool.query(
            `SELECT COUNT(*) AS total
             FROM transactions t
             WHERE ${where}`,
            params
        );

        return { rows, total: countRows[0].total };
    },

    async updateOwned({ id, userId, categoryId, type, amount, description, transactionDate }) {
        const [result] = await pool.query(
            `UPDATE transactions
             SET category_id = ?, type = ?, amount = ?, description = ?, transaction_date = ?
             WHERE id = ? AND user_id = ? AND is_deleted = 0`,
            [categoryId, type, amount, description || null, transactionDate, id, userId]
        );
        return result.affectedRows > 0;
    },

    // Soft delete - marks is_deleted = 1 instead of removing the row
    async softDeleteOwned(id, userId) {
        const [result] = await pool.query(
            `UPDATE transactions
             SET is_deleted = 1
             WHERE id = ? AND user_id = ? AND is_deleted = 0`,
            [id, userId]
        );
        return result.affectedRows > 0;
    },
};

module.exports = TransactionModel;