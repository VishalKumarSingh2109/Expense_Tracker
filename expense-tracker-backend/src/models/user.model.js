const { pool } = require('../config/db.config');

const UserModel = {
    // Find a user by email - used during login and during registration
    // (to check for duplicates before insert)
    async findByEmail(email) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        );
        return rows[0] || null;
    },

    // Find a user by id - used to fetch profile info via req.user.id
    async findById(id) {
        const [rows] = await pool.query(
            'SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1',
            [id]
        );
        return rows[0] || null;
    },

    // Create a new user, returns the inserted user's id
    async create({ name, email, passwordHash }) {
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, passwordHash]
        );
        return result.insertId;
    },
};

module.exports = UserModel;
