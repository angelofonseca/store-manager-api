const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsController } = require('../../../src/controllers/index');
const { productsService } = require('../../../src/services/index');
const { listProducts, listProduct, invalidProductId } = require('../mocks/results.mock');
const { productsFromDB, productFromDB, newProductFromDB, mockSearch } = require('../mocks/products.mock');

describe('Products Controller Testing', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('List products', function () {
    it('List all products', async function () {
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
  });

  describe('Find product', function () {
    it('Find a single product', async function () {
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
    
    it('Show error and not found message when product not found', async function () {
      sinon.stub(productsService, 'checkProduct').resolves(invalidProductId);
    
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

  describe('Create a product', function () {
    it('Creates a product', async function () {
      sinon.stub(productsService, 'checkProductName').resolves({
        status: 'CREATED',
        data: newProductFromDB,
      });
  
      const req = {
        body: { name: 'Test Product' },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productsController.create(req, res);
    
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(sinon.match.has('id'));
      expect(res.json).to.have.been.calledWith(sinon.match.has('name'));
    });
  });

  describe('Update product', function () {
    it('Updates a product nname', async function () {
      sinon.stub(productsService, 'checkForUpdate').resolves({
        status: 'SUCCESSFUL',
        data: newProductFromDB,
      });
  
      const req = {
        body: { name: 'Test Product' },
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productsController.update(req, res);
    
      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe('Remove product', function () {
    it('Removes a product', async function () {
      sinon.stub(productsService, 'checkRemove').resolves({ status: 'NO_CONTENT' });
  
      const req = {
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
        end: sinon.stub(),
      };
  
      await productsController.remove(req, res);
    
      expect(res.status).to.have.been.calledWith(204);
    });
  
    it('Try to remove product that is not in DB', async function () {
      sinon.stub(productsService, 'checkRemove').resolves({ 
        status: 'NOT_FOUND',
        data: {
          message: 'Product not found',
        },
      });
  
      const req = {
        params: { id: 13123 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productsController.remove(req, res);
    
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
    });
  });

  describe('Search product', function () {
    it('Search products from DB successfully', async function () {
      sinon.stub(productsService, 'checkSearch').resolves(mockSearch);
  
      const req = {
        query: { q: 'Traje' },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productsController.search(req, res);
    
      expect(res.status).to.have.been.calledWith(200);
    });
  });
});