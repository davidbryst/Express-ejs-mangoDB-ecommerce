const Router = require('express').Router();
const productController = require('../service/productController');

Router.get('/', productController.getAllProduct);
Router.post('/product', productController.postProduct);
Router.get('/product', productController.getProduct);
Router.put('/product', productController.putProduct);
Router.delete('/product', productController.deleteProduct);

module.exports = Router;