const route = require('express').Router();
const { productsController } = require('../controllers/index');

route.get('/products', productsController.list);
route.post('/products', productsController.create);
route.get('/products/:id', productsController.find);
route.put('/products/:id', productsController.update);
route.delete('/products/:id', productsController.remove);

module.exports = route;