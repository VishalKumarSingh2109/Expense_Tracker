const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// --- Global middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Health check ---
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Expense Tracker API is running' });
});

// --- API routes ---
app.use('/api', routes);

// --- 404 handler for unmatched routes ---
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// --- Centralized error handler (must be last) ---
app.use(errorMiddleware);

module.exports = app;
