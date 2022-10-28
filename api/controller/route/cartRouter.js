const Router = require('express').Router();
const cartController = require('../service/cartController');
const requestAuth = require('../../middleware/authMiddleware').requestAuth;

Router.get('/', requestAuth, cartController.getCartItems);
Router.get('/Item/:id', requestAuth, cartController.postCartItem),
Router.get('/ItemD/:id', requestAuth, cartController.deleteCartItem);


module.exports = Router;

