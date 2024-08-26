const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const list = async (req, res) => {
  const { data, status } = await salesService.checkList();
  
  res.status(mapStatusHTTP(status)).json(data);
};

const find = async (req, res) => {
  const { id: saleId } = req.params;
  const { status, data } = await salesService.checkSale(saleId);

  if (data.message) return res.status(mapStatusHTTP(status)).json(data);

  res.status(mapStatusHTTP(status)).json(data);
};

const create = async (req, res) => {
  const sales = req.body;
  
  const { status, data } = await salesService.checkSales(sales);

  res.status(mapStatusHTTP(status)).json(data);
};

const remove = async (req, res) => {
  const { id: saleId } = req.params;
  
  const { status, data } = await salesService.checkRemove(saleId);

  if (data) return res.status(mapStatusHTTP(status)).json(data);

  res.status(mapStatusHTTP(status)).end();
};

module.exports = {
  list,
  find,
  create,
  remove,
};