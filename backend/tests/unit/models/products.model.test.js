const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { 
  productFromDB,
  productFromModel, 
  productsFromDB, 
  productsFromModel, 
  mockNewProduct, 
  insertIdFromDB, 
  insertIdFromModel, 
} = require('../mocks/products.mock');

describe('Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Get all products', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.list();

    expect(products).to.be.deep.eq(productsFromModel);
  });

  it('Get product by id', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);

    const id = 1;

    const product = await productsModel.find(id);

    expect(product).to.be.deep.eq(productFromModel);
  });

  it('Add product', async function () {
    sinon.stub(connection, 'execute').resolves([insertIdFromDB]);

    const { id } = await productsModel.create(mockNewProduct);

    expect(id).to.be.a('number');
    expect(id).to.be.eq(insertIdFromModel);
  });
});