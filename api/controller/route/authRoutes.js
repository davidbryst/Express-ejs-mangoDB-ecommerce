const express = require('express');
const Router = express.Router();
const authController = require('../service/authController');
const infoMiddleware = require('../../middleware/infoMiddleware');
const requestAuth = require('../../middleware/authMiddleware').requestAuth;

Router.get('/', (req, res) => {
    const url = req.originalUrl;
    const error = req.cookies.error;
    res.render('auth', {url: url, error: error});
});
Router.get('/dash', infoMiddleware, requestAuth, (req, res) => {
    const url = req.originalUrl;
    res.render('admin', {url: url});
});
Router.post('/login', infoMiddleware, authController.postLogin);
Router.post('/register', infoMiddleware, authController.postRegister);
Router.get('/logout', authController.getLogout);

module.exports = Router;