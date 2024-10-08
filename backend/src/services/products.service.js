const { productsModel } = require('../models');
const { validateProductName } = require('./validations/validateInputs');

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
  const error = validateProductName(productName);

  if (error) return { status: error.status, data: { message: error.message } };
  const product = await productsModel.create(productName);
  
  return ({ status: 'CREATED', data: product });
};

const checkForUpdate = async (productId, productName) => {
  const { status, data } = await checkProduct(productId);
  if (data.message) return { status, data };

  const error = validateProductName(productName);
  if (error) return { status: error.status, data: { message: error.message } };
  
  const productUpdated = await productsModel.update(productName, productId);

  return ({ status: 'SUCCESSFUL', data: productUpdated });
};

const checkRemove = async (productId) => {
  const product = await productsModel.find(productId);

  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await productsModel.remove(productId);

  return { status: 'NO_CONTENT' };
};

const checkSearch = async (search) => {
  const result = await productsModel.search(search);

  return result;
};

module.exports = {
  checkList,
  checkProduct,
  checkProductName,
  checkForUpdate,
  checkRemove,
  checkSearch,
};