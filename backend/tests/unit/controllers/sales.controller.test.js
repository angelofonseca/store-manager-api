const { expect } = require('chai');
const sinon = require('sinon');

const { salesController } = require('../../../src/controllers/index');
const { salesService } = require('../../../src/services/index');
const { saleFromDB, salesFromDB } = require('../mocks/sales.mock');
const { listSales, listSale, invalidSaleId } = require('../mocks/results.mock');

describe('Sales Service Testing', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('List successfully all products', async function () {
    sinon.stub(salesService, 'checkList').resolves(listSales);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.list(req, res);
  
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromDB);
  });

  it('List successfully a single product', async function () {
    sinon.stub(salesService, 'checkSale').resolves(listSale);

    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.find(req, res);
  
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromDB);
  });

  it('Show product not found message and status', async function () {
    sinon.stub(salesService, 'checkSale').resolves(invalidSaleId);

    const req = {
      params: { id: 999999 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.find(req, res);
  
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
});