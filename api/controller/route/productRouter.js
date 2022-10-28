const Router = require('express').Router();
const productController = require('../service/productController');
const multerMiddleware = require('../../middleware/multerMiddleware');
const requestAdmin = require('../../middleware/authMiddleware').requestAdmin;

Router.post('/', requestAdmin, multerMiddleware.any(), productController.postProduct);
Router.put('/', requestAdmin, productController.putProduct);
Router.delete('/', requestAdmin, productController.deleteProduct);

module.exports = Router;