const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { productsFromDB, productsFromModel, productFromDB, productFromModel, newProductFromDB, productsAfterDelete } = require('../mocks/products.mock');

describe('Products Service Testing', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Get all products successfully', async function () {
    sinon.stub(productsModel, 'list').resolves([[productsFromDB]]);
  
    const { status, data } = await productsService.checkList();
  
    expect(status).to.be.eq('SUCCESSFUL');
    expect(data).to.be.deep.eq([[productsFromModel]]);
  });

  it('Get a single product successfully', async function () {
    sinon.stub(productsModel, 'find').resolves([[productFromDB]]);
    
    const id = 1;
    const { status, data } = await productsService.checkProduct(id);

    expect(status).to.be.eq('SUCCESSFUL');
    expect(data).to.be.deep.eq([[productFromModel]]);
  });

  it('If product doesnt exist return not found', async function () {
    sinon.stub(productsModel, 'find').resolves(undefined);
    
    const id = 1;
    const { status, data } = await productsService.checkProduct(id);

    expect(status).to.be.eq('NOT_FOUND');
    expect(data.message).to.be.eq('Product not found');
  });

  it('Creates a new product', async function () {
    sinon.stub(productsModel, 'create').resolves(newProductFromDB);
    
    const newProduct = 'Test Product';
    const { status, data } = await productsService.checkProductName(newProduct);

    expect(status).to.be.eq('CREATED');
    expect(data.id).to.be.eq(1123131);
  });

  it('Error when creating a product with invalid name', async function () {
    const newProduct = 'A';

    const { status } = await productsService.checkProductName(newProduct);

    expect(status).to.be.eq('INVALID_VALUE');
  });

  it('Updates a product', async function () {
    const updatedProduct = {
      id: 1,
      name: 'Nome atualizado',
    };

    sinon.stub(productsModel, 'update').resolves(updatedProduct);

    const product = {
      id: 1,
      name: 'Nome',
    };
    
    expect(product.name).to.be.eq('Nome');

    const newName = 'Nome atualizado';
    const { status, data } = await productsService.checkForUpdate(product.id, newName);

    expect(status).to.be.eq('SUCCESSFUL');
    expect(data.name).to.be.eq(newName);
  });

  it('Try to update product not in DB', async function () {
    sinon.stub(productsModel, 'update').resolves({ status: 'NOT_FOUND' });

    const newName = 'Nome atualizado';
    const id = 999;
    const { status } = await productsService.checkForUpdate(id, newName);

    expect(status).to.be.eq('NOT_FOUND');
  });

  it('Removes a product', async function () {
    sinon.stub(productsModel, 'remove').resolves(productsAfterDelete);

    expect(productsFromDB.length).to.be.eq(3);

    const id = 1;
    const { status } = await productsService.checkRemove(id);

    expect(status).to.be.eq('NO_CONTENT');
    sinon.stub(productsModel, 'list').resolves([[productsAfterDelete]]);
  
    const { data } = await productsService.checkList();
  
    expect(data).to.be.deep.eq([[productsAfterDelete]]);
  });
});