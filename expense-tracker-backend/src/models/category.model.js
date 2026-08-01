const { pool } = require('../config/db.config');

const CategoryModel = {
    // Returns default (global) categories + this user's custom ones
    async findAllForUser(userId) {
        const [rows] = await pool.query(
            `SELECT id, user_id, name, type, created_at
             FROM categories
             WHERE user_id IS NULL OR user_id = ?
             ORDER BY type, name`,
            [userId]
        );
        return rows;
    },

    async findById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM categories WHERE id = ? LIMIT 1',
            [id]
        );
        return rows[0] || null;
    },

    async create({ userId, name, type }) {
        const [result] = await pool.query(
            'INSERT INTO categories (user_id, name, type) VALUES (?, ?, ?)',
            [userId, name, type]
        );
        return result.insertId;
    },

    // Only updates if the category belongs to this user (custom category)
    async updateOwned({ id, userId, name, type }) {
        const [result] = await pool.query(
            `UPDATE categories
             SET name = ?, type = ?
             WHERE id = ? AND user_id = ?`,
            [name, type, id, userId]
        );
        return result.affectedRows > 0;
    },

    // Only deletes if the category belongs to this user (custom category)
    async deleteOwned({ id, userId }) {
        const [result] = await pool.query(
            'DELETE FROM categories WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return result.affectedRows > 0;
    },
};

module.exports = CategoryModel;