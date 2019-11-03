const {User} = require('../database/models/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {validationResult} = require('express-validator');
const JWT = require('jsonwebtoken');
const jwtSecret = process.env[JWT_SECRET];
const jwtExpiration = 3600

module.exports = {

    signin: (req, res) => {
        res.status(200).send({ message: 'worked' });
    }, 

    signup: async (req, res) => {

        const errs = validationResult(req);
        if(errs) {
            return res.status(422).json({ errors: errs.array()});
        }


        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        // check if email already exists in database (hash password)
        let id = await User.findOne({
             where: { email: email },
             attributes: ['id']
            });
        if(id) {
            res.status(422).send({ error: 'Email already in use' });
        }

        const passwordHash = await this.hashPassword(password);

        // persist in database
        let user = await User.create({
            email: email,
            username: username,
            password: passwordHash
        })
        
        // gen and send auth token
        const jwtToken = await this.genToken(user.id);

        console.log({ token: jwtToken });
        res.cookie('token', jwtToken, {
            maxAge: jwtExpiration * 1000,
            httpOnly: true,
            secure: true
        });
        res.end();
    },


    hashPassword: async (password) => {
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        return passwordHash;
    },

    genToken: (userId) => {
        return JWT.sign({
            iss: 'afm',
            sub: id,
            iat: new Date().getTime(),
            exp: new Date().getTime() + 3600
        }, jwtSecret);        
    }

};