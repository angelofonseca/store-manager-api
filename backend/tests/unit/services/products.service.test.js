const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { productsFromDB, productsFromModel, productFromDB, productFromModel, newProductFromDB, productsAfterDelete, updatedProduct, mockProduct, mockSearch } = require('../mocks/products.mock');

describe('Products Service Testing', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  describe('List Products', function () {
    it('Get all products successfully', async function () {
      sinon.stub(productsModel, 'list').resolves([[productsFromDB]]);
    
      const { status, data } = await productsService.checkList();
    
      expect(status).to.be.eq('SUCCESSFUL');
      expect(data).to.be.deep.eq([[productsFromModel]]);
    });
  });

  describe('Find product', function () {
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

  describe('Create Product', function () {
    it('Creates a new product successfully', async function () {
      sinon.stub(productsModel, 'create').resolves(newProductFromDB);
      
      const newProduct = 'Test Product';
      const { status, data } = await productsService.checkProductName(newProduct);
  
      expect(status).to.be.eq('CREATED');
      expect(data.id).to.be.eq(1123131);
    });
  
    it('Error when creating a product with invalid name', async function () {
      const newProduct = 'A';
  
      const { status } = await productsService.checkProductName(newProduct);
  
      expect(status).to.be.eq('INVALID_VALUE');
    });
  });

  describe('Update Product', function () {
    it('Updates the name of a product', async function () {
      sinon.stub(productsModel, 'update').resolves(updatedProduct);
      
      expect(mockProduct.name).to.be.eq('Nome');
  
      const newName = 'Nome atualizado';
      const { status, data } = await productsService.checkForUpdate(mockProduct.id, newName);
  
      expect(status).to.be.eq('SUCCESSFUL');
      expect(data.name).to.be.eq(newName);
    });
  
    it('Try to update a product that is not in DB', async function () {
      sinon.stub(productsModel, 'find').resolves();
  
      const newName = 'Nome atualizado';
      const id = 999;
      const { status } = await productsService.checkForUpdate(id, newName);
  
      expect(status).to.be.eq('NOT_FOUND');
    });
  
    it('Try to update a product name with invalid length', async function () {
      const newName = 'AA';
      const id = 1;
  
      const { status, data } = await productsService.checkForUpdate(id, newName);
  
      expect(status).to.be.eq('INVALID_VALUE');
      expect(data.message).to.be.eq('"name" length must be at least 5 characters long');
    });
  });

  describe('Remove Product', function () {
    it('Removes a product successfully', async function () {
      sinon.stub(productsModel, 'remove').resolves();
      sinon.stub(productsModel, 'list').resolves([[productsAfterDelete]]);
  
      const id = 1;
      const { status } = await productsService.checkRemove(id);
  
      expect(status).to.be.eq('NO_CONTENT');
      
      // Verifica se o item foi removido
      const { data } = await productsService.checkList();
      
      expect(data).to.be.deep.eq([[productsAfterDelete]]);
    });
  
    it('Try to remove a product that is not in DB', async function () {
      sinon.stub(productsModel, 'find').resolves();
      const id = 999;
      const { status } = await productsService.checkRemove(id);
  
      expect(status).to.be.eq('NOT_FOUND');
    });
  
    it('Test if search returns correct value when searching for "Traje"', async function () {
      sinon.stub(productsModel, 'search').resolves(mockSearch);
  
      const result = await productsService.checkSearch('Traje');
      expect(result).to.be.deep.eq(mockSearch);
    });
  });
});