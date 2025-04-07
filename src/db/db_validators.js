const { User } = require("../models")



const userExistsByEmail = async (email = '') => {
    const userExists = await User.findOne({email: email.toUpperCase()});
    if(userExists){
        throw new Error('El correo ya existe, debe usar otro correo!');
    }
}

const noUserExistsByEmail = async (email = '') => {
    const userExists = await User.findOne({email: email.toUpperCase()});
    if(!userExists){
        throw new Error('El correo no exite, debe colocar un correo valido!');
    }
}


module.exports = {
    userExistsByEmail,
    noUserExistsByEmail
}
