const { productsModel } = require('../models');

const checkList = async () => {
  const products = await productsModel.list();

  return { status: 'SUCCESSFUL', data: products };
};

const checkProduct = async (productId) => {
  const product = await productsModel.find(productId);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  return { status: 'SUCCESSFUL', data: product };
};

const checkProductName = async (productName) => {
  const product = await productsModel.create(productName);
  
  return ({ status: 'CREATED', data: product });
};

module.exports = {
  checkList,
  checkProduct,
  checkProductName,
};