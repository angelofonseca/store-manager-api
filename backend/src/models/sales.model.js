const connection = require('./connection');

const list = async () => {
  const columns = 'product_id AS productId, sale_id AS saleId, quantity, date';
  const query = `
    SELECT ${columns} FROM sales AS sal 
    INNER JOIN sales_products AS sap 
    ON sal.id = sap.sale_id
  `;

  const [sales] = await connection.execute(query);

  return sales;
};

const find = async (saleId) => {
  const columns = 'product_id AS productId, quantity, date';
  const query = `
    SELECT ${columns} FROM sales AS sal 
    INNER JOIN sales_products AS sap 
    ON sal.id = sap.sale_id 
    WHERE id = ?
  `;

  const [sale] = await connection.execute(query, [saleId]);
  
  return sale;
};

const createSale = async () => {
  const query = 'INSERT INTO sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(query);
  
  return insertId;
};

const createSaleProduct = async (saleId, productId, quantity) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  
  await connection.execute(query, [saleId, productId, quantity]);
};

const create = async (itemsSold) => {
  // Cria uma nova venda na tabela sales
  const saleId = await createSale();

  // Insere cada produto vendido na tabela sales_products
  await Promise.all(itemsSold.map(({ productId, quantity }) => 
    createSaleProduct(saleId, productId, quantity)));

  return {
    id: saleId,
    itemsSold,
  };
};

const removeSale = async (id) => {
  const query = 'DELETE FROM sales WHERE id=?';
  await connection.execute(query, [id]);
};

const remove = async (saleId) => {
  const query = 'DELETE FROM sales_products WHERE sale_id=?';
  await connection.execute(query, [saleId]);
  await removeSale(saleId);
};

module.exports = {
  list,
  find,
  create,
  remove,
};