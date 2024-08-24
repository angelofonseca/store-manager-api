const DATE = '2024-08-22T20:00:39.000Z';

const salesFromDB = [
  {
    productId: 1,
    saleId: 1,
    quantity: 5,
    date: DATE,
  },
  {
    productId: 2,
    saleId: 1,
    quantity: 10,
    date: DATE,
  },
  {
    productId: 3,
    saleId: 2,
    quantity: 15,
    date: DATE,
  },
];

const saleFromDB = [
  {
    productId: 1,
    saleId: 1,
    quantity: 5,
    date: DATE,
  },
  {
    productId: 2,
    saleId: 1,
    quantity: 10,
    date: DATE,
  },
];

const salesFromModel = [
  {
    productId: 1,
    saleId: 1,
    quantity: 5,
    date: DATE,
  },
  {
    productId: 2,
    saleId: 1,
    quantity: 10,
    date: DATE,
  },
  {
    productId: 3,
    saleId: 2,
    quantity: 15,
    date: DATE,
  },
];

const saleFromModel = [
  {
    productId: 1,
    saleId: 1,
    quantity: 5,
    date: DATE,
  },
  {
    productId: 2,
    saleId: 1,
    quantity: 10,
    date: DATE,
  },
];

const newSaleFromDB = {
  id: 6,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 4,
    },
  ],
};

const newSaleFromModel = {
  id: 6,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 4,
    },
  ],
};

const validSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 4,
  },
];

const invalidProductIdSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: -2,
    quantity: 4,
  },
];

const missingProductIdSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    quantity: 4,
  },
];

module.exports = {
  salesFromDB,
  saleFromDB,
  salesFromModel,
  saleFromModel,
  newSaleFromDB,
  newSaleFromModel,
  validSale,
  invalidProductIdSale,
  missingProductIdSale,
};