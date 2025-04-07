const { Schema, model, Types } = require("mongoose");


const PublicationSchema = new Schema({
    user: {
        type: Types.ObjectId,
        required: [true, 'El usuario es obligatorio!']
    },
    public_id_cloudinary:{
        type: String,
        default: null,
    },
    secure_url_cloudinary:{
        type: String,
        default: null,
    },
    address: {
        latitude: {type: String, default: null},
        longitude: {type: String, default: null},
        description: {type: String, default: null}
    },
    description: {
        type: String,
        required: [true, 'La descripcion es obligatoria!']
    },
    tags: {
        type: String,
        default: null,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [{
        user: {
            _id: Types.ObjectId,
            secure_url_cloudinary: String,
            name: String,
            last_name: String
        },
        comment: {
            type: String,
            required: [true, 'El comentario es obligatorio!']
        }
    }]
}, {timestamps: true});

const Publication = model('Publication', PublicationSchema );

module.exports = Publication;