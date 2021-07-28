const express = require('express');
const Router = express.Router();
const authController = require('../service/authController');
const infoMiddleware = require('../../middleware/infoMiddleware');
const { requestAuth } = require('../../middleware/authMiddleware');

Router.get('/', function(req, res){
    const url = req.originalUrl;
    res.render('index', {url: url});
});
Router.get('/auth', function(req, res){
    const url = req.originalUrl;
    res.render('auth', {url: url});
});
Router.get('/dash', infoMiddleware, requestAuth, function(req, res){
    const url = req.originalUrl;
    res.render('admin', {url: url});
});
Router.post('/login', infoMiddleware, authController.postLogin);
Router.post('/register', infoMiddleware, authController.postRegister);
Router.get('/logout', authController.getLogout);

module.exports = Router;