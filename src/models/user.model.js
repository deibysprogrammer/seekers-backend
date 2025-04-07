const { Schema, model, Types } = require("mongoose");


const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio!']
    },
    last_name:{
        type: String,
        required: [true, 'El apellido es obligatorio!']
    },
    birthdate:{
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida!']
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio!'],
        unique: true
    },
    country_code:{
        type: String,
        required: [true, 'El código de la región es obligatorio!']
    },
    phone_number:{
        type: String,
        required: [true, 'El apellido es obligatorio!']
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria!'],
    },
    google:{
        type: Boolean,
        default: false
    },
    pic_profile_picture:{
        type: String,
        default: null
    },
    suc_profile_picture:{
        type: String,
        default: null
    },
    pic_cover_picture:{
        type: String,
        default: null
    },
    suc_cover_picture:{
        type: String,
        default: null
    },
    favorites: [{
        publication: {
            _id: Types.ObjectId,
            secure_url_cloudinary: String,
            public_id_cloudinary: String,
        }
    }],
    shared: [{
        publication: {
            _id: Types.ObjectId
        }
    }]

}, {timestamps: true});

const User = model('User', UserSchema );

module.exports = User;