const { Router } = require("express");
const { login, validateToken, restorePassword } = require("../controllers/auth.controller");
const { noUserExistsByEmail } = require("../db/db_validators");
const validateFields = require("../middlewares/validate_fields");
const verifyJWT = require("../middlewares/verify_jwt");
const { check } = require("express-validator");



const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio!').notEmpty(),
    check('email', 'El formato del correo no es valido!').isEmail(),
    check('email').custom(noUserExistsByEmail),
    check('password', 'La contraseña es obligatoria!').notEmpty(),
    validateFields
], login);

router.get('/verify', [
    verifyJWT,
    validateFields
], validateToken);

router.post('/restore', [
    check('email', 'El correo es obligatorio!').notEmpty(),
    check('email', 'El formato del correo no es valido!').isEmail(),
    check('email').custom(noUserExistsByEmail),
    // check("email").custom(noUserExistsByEmail),
    validateFields
], restorePassword)


module.exports = router;