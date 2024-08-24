const { expect } = require('chai');
const sinon = require('sinon');
const { salesService, productsService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { 
  saleFromDB, 
  salesFromDB, 
  saleFromModel, 
  salesFromModel, 
  newSaleFromDB, 
  newSaleFromModel,
  validSale,
  invalidProductIdSale,
  missingProductIdSale,
} = require('../mocks/sales.mock');

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

  it('When sales are in correct format', async function () {
    const SUCCESS = { status: 'SUCCESSFUL' };
    sinon.stub(productsService, 'checkProduct')
      .onFirstCall()
      .resolves(SUCCESS)
      .onSecondCall()
      .resolves(SUCCESS);

    sinon.stub(salesModel, 'create')
      .resolves(newSaleFromDB);
    
    const { status, data } = await salesService.checkSales(validSale);

    expect(status).to.be.eq('CREATED');
    expect(data).to.be.deep.eq(newSaleFromModel);
  });

  it('If the productId doesnt exist on DB', async function () {
    sinon.stub(productsService, 'checkProduct')
      .onFirstCall()
      .resolves({ status: 'SUCCESSFUL' })
      .onSecondCall()
      .resolves({ status: 'NOT_FOUND' });
    
    const { status } = await salesService.checkSales(invalidProductIdSale);

    expect(status).to.be.eq('NOT_FOUND');
  });

  it('If a value doesnt match a condition on Joi schema', async function () {
    sinon.stub(productsService, 'checkProduct')
      .onFirstCall()
      .resolves({ status: 'BAD_REQUEST' })
      .onSecondCall()
      .resolves({ status: 'SUCESSFUL' });
    
    const { status } = await salesService.checkSales(missingProductIdSale);

    expect(status).to.be.eq('BAD_REQUEST');
  });
});