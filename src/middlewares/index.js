const verifyJWT   = require('../middlewares/verify_jwt');
const validateFields = require('../middlewares/validate_fields');

module.exports = {
    ...verifyJWT,
    validateFields
}