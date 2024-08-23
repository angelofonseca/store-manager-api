const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { saleFromDB, salesFromDB, saleFromModel, salesFromModel } = require('../mocks/sales.mock');
const connection = require('../../../src/models/connection');

describe('Sales Service Testing', function () {
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
});