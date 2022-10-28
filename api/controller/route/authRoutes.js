const express = require('express');
const Router = express.Router();
const authController = require('../service/authController');
const infoMiddleware = require('../../middleware/infoMiddleware');
const requestAuth = require('../../middleware/authMiddleware').requestAuth;
const requestAdmin = require('../../middleware/authMiddleware').requestAdmin;
const requestNotAuth = require('../../middleware/authMiddleware').requestNotAuth;

Router.get('/', requestNotAuth, (req, res) => {
    res.status(200).render('auth', {error: ''});
});
Router.post('/login', authController.postLogin);
Router.post('/register', authController.postRegister);
Router.get('/logout', requestAuth, authController.getLogout);
Router.get('/dash', requestAdmin, authController.getAdmin);
Router.get('/acount', requestAuth, authController.getAcountInfo);
Router.get('/wishList', requestAuth, authController.getWishList);

module.exports = Router;