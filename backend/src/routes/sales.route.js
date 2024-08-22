const route = require('express').Router();
const { salesController } = require('../controllers/index');

route.get('/sales', salesController.list);
route.get('/sales/:id', salesController.find);

module.exports = route;