const insertIdFromDB = { insertId: 1000 };
const insertIdFromModel = 1000;

const productsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const productsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const mockNewProduct = {
  name: 'Product 1',
};

const newProductFromDB = {
  id: 1123131,
  name: 'Test Product',
};

const productsAfterDelete = [
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const mockProduct = {
  id: 1,
  name: 'Nome',
};

const updatedProduct = {
  id: 1,
  name: 'Nome atualizado',
};

const mockSearch = [
  {
    id: 1,
    name: 'Traje de encolhimento',
  },
  {
    id: 55,
    name: 'Traje de teste',
  },
];

module.exports = {
  productsFromDB,
  productFromDB,
  productFromModel,
  productsFromModel,
  mockNewProduct,
  insertIdFromDB,
  insertIdFromModel,
  newProductFromDB,
  productsAfterDelete,
  updatedProduct,
  mockProduct,
  mockSearch,
};