const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate_jwt");
const { User } = require("../models");
const nodemailer = require("nodemailer");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toUpperCase() });

    if (!user) {
      return res.status(400).json({
        msg: "Error, correo / contraseña, es incorrecto!",
      });
    }
    
    const validatePassword = bcryptjs.compareSync(password, user.password);
    
    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: "Error, correo / contraseña, es incorrecto!",
      });
    }

    const token = await generateJWT(user._id);

    const viewUser = {
      iduser: user._id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
    };

    res.json({
      ok: true,
      msg: "Usuario conectado correctamente",
      token,
      user: viewUser,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, intente mas tarde!",
      error,
    });
  }
};

const validateToken = (req = request, res = response) => {
  const user = req.user;

  const viewUser = {
    iduser: user._id,
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    pic_profile_picture: user.pic_profile_picture,
    pic_cover_picture: user.pic_cover_picture
  };

  res.status(200).json({
    ok: true,
    msg: "Sesión validada!",
    user: viewUser,
  });
};

const restorePassword = async (req = request, res = response) => {
  const { email } = req.body

  let ramdonNumber = Math.floor(Math.random() * 900000000) + 100000000;

  try {
    const user = await User.findOne({ email: email.toUpperCase() });

    if (!user) {
      return res.status(400).json({
        msg: 'El correo no exite, debe colocar un correo valido!',
      });
    }

    const salt = bcryptjs.genSaltSync();
    const temporalPassword = bcryptjs.hashSync(ramdonNumber.toString(), salt);
    await User.findByIdAndUpdate(user._id,{password: temporalPassword})
    
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPSSDW
      }
    });
  
    let mailOptions = {
      from: process.env.MAILUSER,
      to: email,
      subject: 'Recuperación de contraseña SEEKERS',
      text: 'Tu contraseña temporal es: ' +  ramdonNumber
  };
        transporter.sendMail(mailOptions, (error, info)  => {
          if (error) {
            res.status(400).json({ok: false, msg: 'El correo no pudo ser enviado, intente mas tarde!'})
          } else {
            res.status(200).json({ok: true, msg: 'Correo enviado satisfactoriamente!'})
          }
  });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, intente mas tarde!",
      error,
    });
  }

}

module.exports = {
  login,
  validateToken,
  restorePassword
};
