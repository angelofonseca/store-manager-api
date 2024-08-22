const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { productsFromDB, productsFromModel, productFromDB, productFromModel } = require('../mocks/products.mock');

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
});