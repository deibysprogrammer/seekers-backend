const { Router } = require("express");
const { check } = require("express-validator");
const {
  publicationPost,
  publicationByUserGet,
  publicationGet,
} = require("../controllers/publication.controller");

const { validateFields } = require("../middlewares");
const verifyJWT = require("../middlewares/verify_jwt");

const router = Router();

router.post(
  "/",
  [
    check('description', 'La descripción es obligatoria!').notEmpty(),
    verifyJWT,
    validateFields,
  ],
  publicationPost
);

router.get("/profile", [verifyJWT, validateFields], publicationByUserGet);

router.get("/all", [verifyJWT, validateFields], publicationGet);

module.exports = router;
