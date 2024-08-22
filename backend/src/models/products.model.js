const connection = require('./connection');

const list = async () => {
  const query = 'SELECT * FROM products ORDER BY id';
  const [products] = await connection.execute(query);

  return products;
};

const find = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);
  
  return product;
};

module.exports = {
  list,
  find,
};