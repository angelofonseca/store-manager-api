const route = require('express').Router();
const { productsController } = require('../controllers/index');

route.get('/products', productsController.list);
route.get('/products/:id', productsController.find);
route.post('/products', productsController.create);

module.exports = route;