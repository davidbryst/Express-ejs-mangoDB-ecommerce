const Router = require('express').Router();
const cartController = require('../service/cartController');

Router.get('/', cartController.getCartItems);
Router.post('/Item', cartController.postCartItem),
Router.delete('/Item', cartController.deleteCartItem);


module.exports = Router;

