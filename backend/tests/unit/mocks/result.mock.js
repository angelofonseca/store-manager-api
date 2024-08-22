const { productsFromModel, productFromModel } = require('./products.mock');

const listProducts = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const listProduct = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const invalidIDProduct = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  listProducts,
  listProduct,
  invalidIDProduct,
};