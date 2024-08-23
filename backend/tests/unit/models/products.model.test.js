const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productFromDB, productFromModel, productsFromDB, productsFromModel } = require('../mocks/products.mock');

describe('Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Get all products', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.list();

    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Get product by id', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);

    const id = 1;

    const product = await productsModel.find(id);

    expect(product).to.be.deep.equal(productFromModel);
  });
});