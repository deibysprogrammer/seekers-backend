const { Router, request } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares");
const {
  userPost,
  userGet,
  userCoverPicture,
  userProfilePicture,
  usersGet,
  userPatch,
  userPasswordPatch,
  otherUserGet,
} = require("../controllers/user.controller");
const { userExistsByEmail } = require("../db/db_validators");
const verifyJWT = require("../middlewares/verify_jwt");

const router = Router();

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio!").notEmpty(),
    check("last_name", "El apellido es obligatorio!").notEmpty(),
    check("birthdate", "La fecha de cumpleaños es obligatorio!").notEmpty(),
    // check(
    //   "birthdate",
    //   "El formato de la fecha no es obligatorio!"
    // ).isDate(),
    check("email", "El correo es obligatorio!").notEmpty(),
    check("email", "El formato del correo no es valido!").isEmail(),
    check("email").custom(userExistsByEmail),
    check("country_code", "El codigo de area es obligatorio!").notEmpty(),
    check("phone_number", "El número de telefono es obligatorio!").notEmpty(),
    check(
      "phone_number",
      "El número de telefono debe contener 10 digitos!"
    ).isLength({
      min: 10,
      max: 10,
    }),
    check("password", "La contraseña es obligatoria!").notEmpty(),
    check(
      "password",
      "La contraseña debe contener entre 8-16 caracteres!"
    ).isLength({
      min: 8,
      max: 16,
    }),
    validateFields,
  ],
  userPost
);

router.get("/", [verifyJWT, validateFields], userGet);

router.get("/other", [verifyJWT, validateFields], otherUserGet)

router.get(
  "/users",
  [
    check("searchProfile", "El parametro para buscar es necesario!").notEmpty(),
    verifyJWT,
    validateFields,
  ],
  usersGet
);

router.patch(
  "/profile_picture",
  [
    verifyJWT,
    validateFields,
  ],
  userProfilePicture
);

router.patch(
  "/cover_picture",
  [
    verifyJWT,
    validateFields,
  ],
  userCoverPicture
);

router.patch("/", [verifyJWT, validateFields], userPatch);

router.patch(
  "/password",
  [
    check("password", "La contraseña es obligatoria!").notEmpty(),
    check(
      "password",
      "La contraseña debe contener entre 8-16 caracteres!"
    ).isLength({
      min: 8,
      max: 16,
    }),
    check("new_password", "La nueva contraseña es obligatorio!").notEmpty(),
    check(
      "new_password",
      "La nueva contraseña debe contener entre 8-16 caracteres!"
    ).isLength({
      min: 8,
      max: 16,
    }),
    verifyJWT,
    validateFields,
  ],
  userPasswordPatch
);

module.exports = router;
