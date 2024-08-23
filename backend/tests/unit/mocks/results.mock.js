const { productsFromModel, productFromModel } = require('./products.mock');
const { salesFromModel, saleFromModel } = require('./sales.mock');

const listProducts = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const listProduct = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const invalidProductId = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const listSales = {
  status: 'SUCCESSFUL',
  data: salesFromModel,
};

const listSale = {
  status: 'SUCCESSFUL',
  data: saleFromModel,
};

const invalidSaleId = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

module.exports = {
  listProducts,
  listProduct,
  invalidProductId,
  listSales,
  listSale,
  invalidSaleId,
};