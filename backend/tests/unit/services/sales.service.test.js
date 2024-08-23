const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { saleFromDB, salesFromDB, saleFromModel, salesFromModel } = require('../mocks/sales.mock');

describe('Sales Service Testing', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Get all sales successfully', async function () {
    sinon.stub(salesModel, 'list').resolves([salesFromDB]);
  
    const { status, data } = await salesService.checkList();
  
    expect(status).to.be.eq('SUCCESSFUL');
    expect(data).to.be.deep.eq([salesFromModel]);
  });

  it('Get a single sale successfully', async function () {
    sinon.stub(salesModel, 'find').resolves([saleFromDB]);
    
    const id = 1;
    const { status, data } = await salesService.checkSale(id);

    expect(status).to.be.eq('SUCCESSFUL');
    expect(data).to.be.deep.eq([saleFromModel]);
  });

  it('If a sale doesnt exist, return not found', async function () {
    sinon.stub(salesModel, 'find').resolves([]);
    
    const id = 1;
    const { status, data } = await salesService.checkSale(id);

    expect(status).to.be.eq('NOT_FOUND');
    expect(data.message).to.be.eq('Sale not found');
  });
});