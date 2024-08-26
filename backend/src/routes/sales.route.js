const route = require('express').Router();
const { salesController } = require('../controllers/index');

route.get('/sales', salesController.list);
route.get('/sales/:id', salesController.find);
route.delete('/sales/:id', salesController.remove);
route.post('/sales', salesController.create);
route.put('/sales/:saleId/products/:productId/quantity', salesController.updateQuantity);

module.exports = route;