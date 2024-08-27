const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
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
  updatedSale,
} = require('../mocks/sales.mock');

describe('Sales Service Testing', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  describe('List Sales', function () {
    it('Get all sales successfully', async function () {
      sinon.stub(salesModel, 'list').resolves([salesFromDB]);
    
      const { status, data } = await salesService.checkList();
    
      expect(status).to.be.eq('SUCCESSFUL');
      expect(data).to.be.deep.eq([salesFromModel]);
    });
  });

  describe('Find Sale', function () {
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

  describe('Create Product', function () {
    it('Tests if creates a sale when data is provided correctly', async function () {
      sinon.stub(salesModel, 'create').resolves(newSaleFromDB);
      
      const { status, data } = await salesService.checkSales(validSale);
  
      expect(status).to.be.eq('CREATED');
      expect(data).to.be.deep.eq(newSaleFromModel);
    });
  
    it('Tests if sale isn\'t created when product id doesnt exist on DB', async function () {
      const { status } = await salesService.checkSales(invalidProductIdSale);
  
      expect(status).to.be.eq('NOT_FOUND');
    });
  
    it('Tests if sale isn\'t created when key "productId" is missing on request body', async function () {
      const { status } = await salesService.checkSales(missingProductIdSale);
  
      expect(status).to.be.eq('BAD_REQUEST');
    });
  });

  describe('Remove Product', function () {
    it('Tests if sale is removed', async function () {
      sinon.stub(salesModel, 'find').resolves([saleFromDB]);
  
      const saleId = 1;
      const { status } = await salesService.checkRemove(saleId);
  
      expect(status).to.be.eq('NO_CONTENT');
    });
  
    it('Tests if sale is not removed when sale isn\'t found', async function () {
      sinon.stub(salesModel, 'find').resolves([]);
  
      const saleId = 21231;
      const { status } = await salesService.checkRemove(saleId);
  
      expect(status).to.be.eq('NOT_FOUND');
    });
  });

  describe('Update Product', function () {
    it('Test if product quantity is updated in sale', async function () {
      sinon.stub(salesModel, 'updateQuantity').resolves(updatedSale);
      sinon.stub(salesModel, 'find').resolves(saleFromDB);
  
      const saleId = 1;
      const quantity = { quantity: 100 };
      const productId = 1;
  
      const { status, data } = await salesService.checkUpdateQuantity(quantity, saleId, productId);
  
      expect(status).to.be.eq('SUCCESSFUL');
      expect(data.quantity).to.be.eq(100);
    });
  
    it('Test if product isn\'t found in DB when trying to update quantity', async function () {
      sinon.stub(salesModel, 'updateQuantity').resolves(updatedSale);
      sinon.stub(salesModel, 'find').resolves([]);
  
      const saleId = 1;
      const quantity = { quantity: 100 };
      const productId = 1;
  
      const { status } = await salesService.checkUpdateQuantity(quantity, saleId, productId);
  
      expect(status).to.be.eq('NOT_FOUND');
    });
  
    it('Test if product isn\'t found in the Sale when trying to update quantity', async function () {
      sinon.stub(salesModel, 'updateQuantity').resolves(updatedSale);
      sinon.stub(salesModel, 'find').resolves(saleFromDB);
  
      const saleId = 1;
      const quantity = { quantity: 100 };
      const productId = 404;
  
      const { status } = await salesService.checkUpdateQuantity(quantity, saleId, productId);
  
      expect(status).to.be.eq('NOT_FOUND');
    });
    
    it('Test for invalid quantity ON request body', async function () {
      const saleId = 1;
      const quantity = { quantity: -1 };
      const productId = 1;
  
      const { status } = await salesService.checkUpdateQuantity(quantity, saleId, productId);
  
      expect(status).to.be.eq('INVALID_VALUE');
    });
  
    it('Test for quantity ON request body', async function () {
      const saleId = 1;
      const quantity = { quantit: 1 };
      const productId = 1;
  
      const { status } = await salesService.checkUpdateQuantity(quantity, saleId, productId);
  
      expect(status).to.be.eq('BAD_REQUEST');
    });
  });
});