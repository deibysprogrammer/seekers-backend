const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyJWT = async (req = request, res = response, next) => {
  token = req.header("token");

  if (!token) {
    return res.status(401).json({ msg: "No hay token en la peticion" });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(id)

    if (!user) {
      return res
        .status(402)
        .json({ msg: "Token no valido! - usuario no existe en la BD!" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

module.exports = verifyJWT;
