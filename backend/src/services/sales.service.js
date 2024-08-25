const { salesModel } = require('../models');
const { validateSale } = require('./validations/validateInputs');
const productsService = require('./products.service');

const checkList = async () => {
  const sales = await salesModel.list();

  return { status: 'SUCCESSFUL', data: sales };
};

const checkSale = async (saleId) => {
  const sale = await salesModel.find(saleId);
  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  return { status: 'SUCCESSFUL', data: sale };
};

const checkProductsId = async (sales) => {
  const validatedProducts = await Promise.all(sales
    .map(({ productId }) => productsService.checkProduct(productId)));
  const error = validatedProducts.find((element) => element.status === 'NOT_FOUND');
  return error;
};

const checkSales = async (sales) => {
  const error = await validateSale(sales);
  if (error) return { status: error.status, data: { message: error.message } };

  const notFound = await checkProductsId(sales);
  if (notFound) return { status: notFound.status, data: notFound.data };

  const newSales = await salesModel.create(sales);

  return { status: 'CREATED', data: newSales };
};

module.exports = {
  checkList,
  checkSale,
  checkSales,
};