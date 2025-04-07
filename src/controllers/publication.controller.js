const { response, request } = require("express");
const Publication = require("../models/publication.model");
const cloudinary = require("../helpers/cloudinary");
const { User } = require("../models");

const publicationPost = async (req = request, res = response) => {
  const user = req.user;
  let image = null;
  if (req.files) {
    if (req.files.image) {
      const { tempFilePath } = req.files.image;
      image = tempFilePath;
    }
  }

  const {
    addressDescription,
    addressLatitude,
    addressLongitude,
    description,
    tags,
  } = req.body;

  const publication = new Publication({
    user: user._id,
    description: description.toUpperCase(),
  });

  if (addressLatitude) {
    (publication.address.latitude = addressLatitude),
      (publication.address.longitude = addressLongitude),
      (publication.address.description = addressDescription.toUpperCase());
  }

  if (tags) {
    publication.tags = tags.toUpperCase();
  }

  try {
    if(image){
      const { public_id, secure_url } = await cloudinary.uploader.upload(image);
      publication.public_id_cloudinary = public_id;
      publication.secure_url_cloudinary = secure_url;
    }

    await publication.save();

    res.status(200).json({
      ok: true,
      msg: "La publicacion fue creada correctamente!",
      publication,
    });
  } catch (error) {
    res.status(500).json("Error interno del servidor!");
  }
};

const publicationByUserGet = async (req = request, res = response) => {
  let id = ''
  const { _id } = req.query

  id = _id

  if(_id === 'profile'){
    const user = req.user

    id = user._id
  }

  try {
    const publications = await Publication.find({ user: id });

    const publicationsUser = [];

    for (const publication of publications) {
      const user = await User.findById(publication.user);

      publicationsUser.push({
        publication,
        user: {
          name: user.name,
          last_name: user.last_name,
          suc_profile_picture: user.suc_profile_picture,
        },
      });
    }

    res.status(200).json({ ok: true, publications: publicationsUser });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error, intente mas tarde!" });
  }
};

const publicationGet = async (req = request, res = response) => {
  try {
    const publications = await Publication.find({});

    const publicationsUser = [];

    for (const publication of publications) {
      const user = await User.findById(publication.user);

      publicationsUser.push({
        publication,
        user: {
          name: user.name,
          last_name: user.last_name,
          suc_profile_picture: user.suc_profile_picture,
        },
      });
    }

    res.status(200).json({ ok: true, publications: publicationsUser });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error, intente mas tarde!" });
  }
};

module.exports = {
  publicationPost,
  publicationByUserGet,
  publicationGet
};
