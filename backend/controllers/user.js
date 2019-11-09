const { User, Sequelize } = require("../database/models/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const jwtSecret = process.env["JWT_SECRET"];
const jwtExpiration = 3600;

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return msg;
};

module.exports = {
  hashPassword: async function(password) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  },

  genToken: function(id) {
    return JWT.sign(
      {
        iss: "afm",
        sub: id,
        iat: new Date().getTime(),
        exp: new Date().getTime() + 3600
      },
      jwtSecret
    );
  },

  isValidPassword: function(password, hash) {
    return bcrypt.compare(password, hash);
  },

  signin: async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await User.findOne({
        where: {
          email: email
        }
      });

      if (!user) {
        res
          .status(422)
          .set("Content-Type", "application/json")
          .send({ error: "Incorrect email or password." });
        return;
      }
      const isValid = await this.isValidPassword(password, user.password);

      if (!isValid) {
        res
          .status(422)
          .set("Content-Type", "application/json")
          .send({ error: "Incorrect email or password." });
        return;
      }

      const jwtToken = await this.genToken(user.id);

      res.cookie("jwt", jwtToken, {
        maxAge: jwtExpiration * 1000,
        secure: true,
        httpOnly: true
      });

      user.dataValues.jwt = jwtToken;
      delete user.dataValues.password

      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ user: user });
    } catch (err) {
      res
        .status(500)
        .set("Content-Type", "application/json")
        .send({ error: "An error has occurred, please try again later." });
    }
  },

  signup: async function(req, res) {
    const errs = validationResult(req).formatWith(errorFormatter);
    if (!errs.isEmpty()) {
      return res.status(422).json({ errors: errs.mapped() });
    }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    try {
      let users = await User.findAll({
        where: {
          [Sequelize.Op.or]: [{ username: username }, { email: email }]
        },
        attributes: ["username", "email"]
      });

      if (users.length != 0) {
        if (users.length == 2) {
          res.status(422).send({
            errors: {
              username: "Username already in use",
              email: "Email already in use"
            }
          });
          return;
        }
        if (users[0].username == username) {
          res.status(422).send({
            errors: {
              username: "Username already in use"
            }
          });
          return;
        }
        res.status(422).send({
          errors: {
            email: "Email already in use"
          }
        });
        return;
      }

      const passwordHash = await this.hashPassword(password);

      // persist in database
      let user = await User.create({
        email: email,
        username: username,
        password: passwordHash
      });

      // gen and send auth token
      const jwtToken = await this.genToken(user.id);

      res.cookie("jwt", jwtToken, {
        maxAge: jwtExpiration * 1000,
        secure: true,
        httpOnly: true
      });

      user.dataValues.jwt = jwtToken;
      delete user.dataValues.password

      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ user: user });
    } catch (error) {
      console.error(error);
      res.end();
    }
  }
};
