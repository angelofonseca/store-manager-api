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

const remove = async (productId) => {
  const query = 'DELETE FROM products WHERE id=?';
  await connection.execute(query, [productId]);
};

const search = async (searchParam) => {
  const query = 'SELECT * FROM products WHERE name LIKE concat(?, "%")';
  const [result] = await connection.execute(query, [searchParam]);
  return result;
};

module.exports = {
  list,
  find,
  create,
  update,
  remove,
  search,
};