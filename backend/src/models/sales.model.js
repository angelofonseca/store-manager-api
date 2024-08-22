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

const find = async (id) => {
  const columns = 'product_id AS productId, quantity, date';
  const query = `
    SELECT ${columns} FROM sales AS sal 
    INNER JOIN sales_products AS sap 
    ON sal.id = sap.sale_id 
    WHERE id = ?
  `;
  const [sale] = await connection.execute(query, [id]);
  
  return sale;
};

module.exports = {
  list,
  find,
};