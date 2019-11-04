const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userController = require('./controllers/user');
const {check} = require('express-validator');
const cookieParser = require('cookie-parser');
const passport = require('./passport');
 
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/signin', passport.authenticate('local', { session: false })
, userController.signin.bind(userController));

app.post('/signup', [
    check('email').isEmail()
], userController.signup.bind(userController));


module.exports = app;
