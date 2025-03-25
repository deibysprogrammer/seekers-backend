const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { User } = require("../models");
const cloudinary = require("../helpers/cloudinary");

const userPost = async (req = request, res = response) => {
  const {
    name,
    last_name,
    birthdate,
    email,
    country_code,
    phone_number,
    password,
  } = req.body;
  const user = new User({
    name: name.toUpperCase(),
    last_name: last_name.toUpperCase(),
    birthdate,
    email: email.toUpperCase(),
    country_code,
    phone_number,
    password,
  });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  try {
    await user.save();

    const viewUser = {
      name: user.name,
      last_name: user.last_name,
    };

    res.json({
      ok: true,
      msg: "Usuario creado correctamente!",
      user: viewUser,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
      msg: "Error, intente mas tarde!",
    });
  }
};

const userGet = async (req = request, res = response) => {
  const {
    name,
    last_name,
    birthdate,
    email,
    country_code,
    phone_number,
    pic_profile_picture,
    suc_profile_picture,
    pic_cover_picture,
    suc_cover_picture,
  } = req.user;

  res.status(200).json({
    ok: true,
    user: {
      name,
      last_name,
      birthdate,
      email,
      country_code,
      phone_number,
      pic_profile_picture,
      suc_profile_picture,
      pic_cover_picture,
      suc_cover_picture,
    },
  });
};

const otherUserGet = async (req = request, res = response) => {
  const { _id } = req.query;
    try {
      const user = await User.findById(_id);

      res.status(200).json({
        ok: true,
        user: {
          _id: user._id,
          name: user.name,
          last_name: user.last_name,
          birthdate: user.birthdate,
          email: user.email,
          country_code: user.country_code,
          phone_number: user.phone_number,
          pic_profile_picture: user.pic_profile_picture,
          suc_profile_picture: user.suc_profile_picture,
          pic_cover_picture: user.pic_profile_picture,
          suc_cover_picture: user.suc_cover_picture,
        },
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        error,
        msg: "Error, intente mas tarde!",
      });
  }
}

const usersGet = async (req = request, res = response) => {
  const { searchProfile } = req.query;

  try {
    const users = await User.find({
      name: { $regex: ".*" + searchProfile + ".*", $options: "i" },
    });

    res.status(200).json({ ok: true, users });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
      msg: "Error, intente mas tarde!",
    });
  }
};

const userProfilePicture = async (req = request, res = response) => {
  const { _id, pic_profile_picture } = req.user;

  if(!req.files) {
    return res.status(400).json({
      ok: false,
      error,
      msg: "La imagen es obligatoria!",
    });
  }

  const { tempFilePath } = req.files.profile_picture;

  try {

    if(pic_profile_picture){
      await cloudinary.uploader.destroy(pic_profile_picture)
    }

    const { public_id, secure_url } = await cloudinary.uploader.upload(
      tempFilePath
    );

    await User.findByIdAndUpdate(_id, {
      pic_profile_picture: public_id,
      suc_profile_picture: secure_url,
    });

    res.status(200).json({
      ok: true,
      msg: "La foto de perfil fue actualizada con exito!",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
      msg: "Error, intente mas tarde!",
    });
  }
};

const userCoverPicture = async (req = request, res = response) => {
  const { _id, pic_cover_picture } = req.user;

  if(!req.files) {
    return res.status(400).json({
      ok: false,
      error,
      msg: "La imagen es obligatoria!",
    });
  }

  const { tempFilePath } = req.files.cover_picture;

  try {

    if(pic_cover_picture){
      await cloudinary.uploader.destroy(pic_cover_picture)
    }

    const { public_id, secure_url } = await cloudinary.uploader.upload(
      tempFilePath
    );

    await User.findByIdAndUpdate(_id, {
      pic_cover_picture: public_id,
      suc_cover_picture: secure_url,
    });

    res.status(200).json({
      ok: true,
      msg: "La foto de portada fue actualizada con exito!",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
      msg: "Error, intente mas tarde!",
    });
  }
};

const userPatch = async (req = request, res = response) => {
  const { name, last_name, birthdate, email, country_code, phone_number } =
    req.body;

  const { _id } = req.user;

  try {
    await User.findByIdAndUpdate(_id, {
      name: name.toUpperCase(),
      last_name: last_name.toUpperCase(),
      birthdate,
      email: email.toUpperCase(),
      country_code,
      phone_number,
    });

    res.status(200).json({
      ok: true,
      msg: "El usuario fue actualizado con exito!",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
      msg: "Error, intente mas tarde!",
    });
  }
};

const userPasswordPatch = async (req = request, res = response) => {
  const { password, new_password } = req.body;

  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    const verifyPassword = bcryptjs.compareSync(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña anterior es incorrecta!",
      });
    }

    if(password === new_password){
      return res.status(400).json({
        ok: false,
        msg: "La nueva contraseña no puede ser igual que la anterior!",
      });
    }

    const salt = bcryptjs.genSaltSync();
    const password_update = bcryptjs.hashSync(new_password, salt);

    await User.findByIdAndUpdate(_id, {
      password: password_update,
    });

    res.status(200).json({
      ok: true,
      msg: "La contraseña fue actualizada correctamente!",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
      msg: "Error, intente mas tarde!",
    });
  }
};

module.exports = {
  userPost,
  userGet,
  otherUserGet,
  usersGet,
  userPatch,
  userPasswordPatch,
  userCoverPicture,
  userProfilePicture,
};
