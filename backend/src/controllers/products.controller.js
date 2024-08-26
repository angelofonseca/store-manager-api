const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const list = async (req, res) => {
  const { data, status } = await productsService.checkList();
  
  res.status(mapStatusHTTP(status)).json(data);
};

const find = async (req, res) => {
  const { id: productId } = req.params;
  const { status, data } = await productsService.checkProduct(productId);

  if (data.message) return res.status(mapStatusHTTP(status)).json(data);

  res.status(mapStatusHTTP(status)).json(data);
};

const create = async (req, res) => {
  const { name } = req.body;

  const { status, data } = await productsService.checkProductName(name);

  res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const productId = Number(id);

  const updatedProduct = await productsService.checkForUpdate(productId, name);

  res.status(mapStatusHTTP(updatedProduct.status)).json(updatedProduct.data);
};

const remove = async (req, res) => {
  const { id: productId } = req.params;

  const { status, data } = await productsService.checkRemove(+productId);

  if (data) return res.status(mapStatusHTTP(status)).json(data);

  res.status(mapStatusHTTP(status)).end();
};

const search = async (req, res) => {
  const { q: name } = req.query;

  const result = await productsService.checkSearch(name);

  res.status(200).json(result);
};

module.exports = {
  list,
  find,
  create,
  update,
  remove,
  search,
};