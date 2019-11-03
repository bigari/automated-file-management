const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userController = require('./controllers/user');
const {check} = require('express-validator');

const app = express();
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/signin', [
    check('email').isEmail()
], userController.signin);

app.post('/signup', [
    check('email').isEmail()
], userController.signup);

module.exports = app;
