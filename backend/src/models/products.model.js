const connection = require('./connection');

const list = async () => {
  const query = 'SELECT * FROM products ORDER BY id';
  const [products] = await connection.execute(query);

  return products;
};

const find = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [productId]);
  
  return product;
};

const create = async (name) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const [{ insertId: id }] = await connection.execute(query, [name]);
  
  return {
    id,
    name,
  };
};

const update = async (name, productId) => {
  const query = 'UPDATE products SET name=? WHERE id=?';
  await connection.execute(query, [name, productId]);

  return {
    id: productId,
    name,
  };
};

module.exports = {
  list,
  find,
  create,
  update,
};