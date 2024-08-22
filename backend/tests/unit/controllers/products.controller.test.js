const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { listProducts, listProduct, invalidIDProduct } = require('../mocks/result.mock');
const { productsFromDB, productFromDB } = require('../mocks/products.mock');

describe('Products Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('List successfully all products', async function () {
    sinon.stub(productsService, 'checkList').resolves(listProducts);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.list(req, res);
  
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromDB);
  });

  it('List successfully a single product', async function () {
    sinon.stub(productsService, 'checkProduct').resolves(listProduct);

    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.find(req, res);
  
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromDB);
  });

  it('Show product not found message and status', async function () {
    sinon.stub(productsService, 'checkProduct').resolves(invalidIDProduct);

    const req = {
      params: { id: '1' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.find(req, res);
  
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
});