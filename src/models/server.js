const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/configdb");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.path = {
      auth: "/api/auth",
      publication: "/api/publication",
      user: "/api/user",
    };

    this.conectionDB();

    this.middlewares();

    this.routes();
  }

  async conectionDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("src/public"));

    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/'
    }))
  }

  routes() {
    this.app.use(this.path.auth, require("../routes/auth.route"));
    this.app.use(this.path.publication, require("../routes/publication.route"));
    this.app.use(this.path.user, require("../routes/user.router"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`El servidor esta corriendo en el puerto: ${this.port}`);
    });
  }
}

module.exports = Server;
