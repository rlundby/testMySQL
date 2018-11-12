const route = require('express').Router();
const controller = require('../controllers/getProductsController');

route.get('/', controller.getAllProducts);
route.get('/cat', controller.getAllCategories);
route.get('/cat:id', controller.getSingleCategory);

module.exports = route;