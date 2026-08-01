const { pool } = require('../config/db.config');

const SavingsGoalModel = {
    async create({ userId, goalName, targetAmount, targetDate }) {
        const [result] = await pool.query(
            `INSERT INTO savings_goals (user_id, goal_name, target_amount, target_date)
             VALUES (?, ?, ?, ?)`,
            [userId, goalName, targetAmount, targetDate || null]
        );
        return result.insertId;
    },

    async findAllForUser(userId) {
        const [rows] = await pool.query(
            `SELECT * FROM savings_goals WHERE user_id = ? ORDER BY created_at DESC`,
            [userId]
        );
        return rows;
    },

    async findByIdForUser(id, userId) {
        const [rows] = await pool.query(
            `SELECT * FROM savings_goals WHERE id = ? AND user_id = ? LIMIT 1`,
            [id, userId]
        );
        return rows[0] || null;
    },

    async updateOwned({ id, userId, goalName, targetAmount, targetDate }) {
        const [result] = await pool.query(
            `UPDATE savings_goals
             SET goal_name = ?, target_amount = ?, target_date = ?
             WHERE id = ? AND user_id = ?`,
            [goalName, targetAmount, targetDate || null, id, userId]
        );
        return result.affectedRows > 0;
    },

    // Adds `amount` to saved_amount, and updates status to 'completed'
    // if the goal is fully funded - all done in one query for atomicity
    async contribute({ id, userId, amount }) {
        const [result] = await pool.query(
            `UPDATE savings_goals
             SET saved_amount = saved_amount + ?,
                 status = CASE
                     WHEN (saved_amount + ?) >= target_amount THEN 'completed'
                     ELSE 'active'
                 END
             WHERE id = ? AND user_id = ?`,
            [amount, amount, id, userId]
        );
        return result.affectedRows > 0;
    },

    async deleteOwned(id, userId) {
        const [result] = await pool.query(
            `DELETE FROM savings_goals WHERE id = ? AND user_id = ?`,
            [id, userId]
        );
        return result.affectedRows > 0;
    },
};

module.exports = SavingsGoalModel;