const express = require('express');
const { login } = require('../controllers/user/login');
const verify = require('../middlewares/verify');

const routeLogin = express();

routeLogin.post('/login', verify.verifyFieldsLogin, verify.verifyEmailLogin, verify.verifyPassword, login);

module.exports = routeLogin;