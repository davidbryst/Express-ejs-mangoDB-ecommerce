const Router = require('express').Router();
const controller = require('../service/controller');

Router.get('/', controller.getIndex);
Router.get('/shop', controller.getShop);
Router.get('/single/:id', controller.getSingle);
Router.get('/error/:error', controller.getError);


module.exports = Router;