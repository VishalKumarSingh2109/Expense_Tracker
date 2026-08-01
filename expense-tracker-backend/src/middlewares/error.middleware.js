const { error } = require('../utils/responseHandler');

// Catches anything passed to next(err) from controllers,
// plus any uncaught errors from async route handlers.
// Keep this registered LAST in app.js, after all routes.
function errorMiddleware(err, req, res, next) {
    console.error('Unhandled error:', err);

    // MySQL duplicate entry (e.g. email already registered)
    if (err.code === 'ER_DUP_ENTRY') {
        return error(res, 409, 'A record with this value already exists.');
    }

    // MySQL FK constraint - e.g. trying to delete a category still
    // used by existing transactions
    if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
        return error(res, 409, 'This record is linked to other data and cannot be deleted.');
    }

    return error(
        res,
        err.statusCode || 500,
        err.message || 'Something went wrong on the server.'
    );
}

module.exports = errorMiddleware;