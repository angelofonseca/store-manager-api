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
  productsAfterDelete,
  updatedProduct,
  mockSearch, 
} = require('../mocks/products.mock');

describe('Products Model Testing', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('List all products', async function () {
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

  it('Update product', async function () {
    const newName = 'Nome atualizado';

    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([[productFromDB]])
      .onSecondCall()
      .resolves(updatedProduct);

    const id = 1;

    const product = await productsModel.find(id);

    expect(product.name).to.be.eq(productFromModel.name);

    const result = await productsModel.update(newName, id);

    expect(result).to.be.deep.eq(updatedProduct);
  });

  it('Remove product', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([[productFromDB]])
      .onSecondCall()
      .resolves(productsAfterDelete);

    const id = 1;

    const product = await productsModel.find(id);
  
    expect(product.name).to.be.eq(productFromModel.name);
    expect(productsFromDB.length).to.be.eq(3);

    await productsModel.remove(id);

    expect(productsAfterDelete.length).to.be.eq(2);
  });

  it('Search product', async function () {
    sinon.stub(connection, 'execute').resolves([mockSearch]);
    const search = await productsModel.search('Traje');

    expect(search).to.be.deep.eq(mockSearch);
  });
});