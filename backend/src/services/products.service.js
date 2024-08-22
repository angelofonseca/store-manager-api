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

module.exports = {
  checkList,
  checkProduct,
};