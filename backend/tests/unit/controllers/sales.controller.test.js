const { expect } = require('chai');
const sinon = require('sinon');

const { salesController } = require('../../../src/controllers/index');
const { salesService } = require('../../../src/services/index');
const { saleFromDB, salesFromDB, validSale, newSaleFromModel, updatedSale } = require('../mocks/sales.mock');
const { listSales, listSale, invalidSaleId, createdSale } = require('../mocks/results.mock');

describe('Sales Controller Testing', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  describe('List all products', function () {
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
  });
  describe('Find a product', function () {
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
    
    it('Show error and not found message when product isn\'t found', async function () {
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

  describe('Create a sale', function () {
    it('Create new sale', async function () {
      sinon.stub(salesService, 'checkSales').resolves(createdSale);
  
      const req = {
        body: { validSale },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await salesController.create(req, res);
    
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSaleFromModel);
    });
  });

  describe('Remove a sale', function () {
    it('Remove sale', async function () {
      sinon.stub(salesService, 'checkRemove').resolves({ status: 'NO_CONTENT' });
  
      const req = {
        params: { id: 2 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        end: sinon.stub(),
      };
  
      await salesController.remove(req, res);
    
      expect(res.status).to.have.been.calledWith(204);
    });
  
    it('Try to remove sale that doesn\'t exist on DB', async function () {
      sinon.stub(salesService, 'checkRemove').resolves(invalidSaleId);
  
      const req = {
        params: { id: 123131 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await salesController.remove(req, res);
    
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
    });
  });

  describe('Update sale', function () {
    it('Update product quantity in sale', async function () {
      sinon.stub(salesService, 'checkUpdateQuantity').resolves(
        {
          status: 'SUCCESSFUL',
          data: {
            date: '2024-08-22T20:00:39.000Z',
            ...updatedSale,
          },
        },
      );
  
      const req = {
        params: { saleId: 1, productId: 1 },
        body: { quantity: 100 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await salesController.updateQuantity(req, res);
    
      expect(res.status).to.have.been.calledWith(200);
    });
  });
});