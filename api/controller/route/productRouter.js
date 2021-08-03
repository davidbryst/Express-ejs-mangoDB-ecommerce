const Router = require('express').Router();
const productController = require('../service/productController');

Router.get('/', productController.getAllProduct);
Router.get('/single/:id', productController.getOneProduct);

module.exports = Router;