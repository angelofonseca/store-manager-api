const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { saleFromDB, salesFromDB, saleFromModel, salesFromModel } = require('../mocks/sales.mock');
const { insertIdFromDB, insertIdFromModel } = require('../mocks/products.mock');

describe('Sales Model Testing', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Get all sales successfully', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
  
    const sales = await salesModel.list();
  
    expect(sales).to.be.deep.eq(salesFromModel);
  });

  it('Get a single sale successfully', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);

    const id = 1;
    const sale = await salesModel.find(id);

    expect(sale).to.be.deep.eq(saleFromModel);
  });

  it('Post new sale on table sales', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([insertIdFromDB])
      .onSecondCall()
      .resolves(null);

    const sale = await salesModel.create(salesFromModel);

    expect(sale.id).to.be.eq(insertIdFromModel);
  });
});