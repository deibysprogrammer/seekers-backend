const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const generateJWT = (id = -1) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: "1h",
    }, (err, token) => {
        if(err){
            console.error(err);
            reject('No se pudo generar el token!');
        } else {
            resolve(token);
        }
    });
  });
};

const seeUserId = (req = request, res = response) => {
  const token = request.headers('token-e');
  
  const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

  return id;
}


module.exports = {
  generateJWT,
  seeUserId
};
