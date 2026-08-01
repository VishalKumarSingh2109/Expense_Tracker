const { validationResult } = require('express-validator');
const { error } = require('../utils/responseHandler');

// Runs after the express-validator rules array in any route.
// If any rule failed, short-circuits with a 422 and the list of errors.
function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return error(res, 422, 'Validation failed', errors.array());
    }
    next();
}

module.exports = validate;
