const { salesModel } = require('../models');

const checkList = async () => {
  const sales = await salesModel.list();

  return { status: 'SUCCESSFUL', data: sales };
};

const checkSale = async (saleId) => {
  const sale = await salesModel.find(saleId);
  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  return { status: 'SUCCESSFUL', data: sale };
};

const checkSales = async (sales) => {
  const newSales = await salesModel.create(sales);

  return { status: 'CREATED', data: newSales };
};

module.exports = {
  checkList,
  checkSale,
  checkSales,
};