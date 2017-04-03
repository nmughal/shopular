(function() {
  'use strict';

  let expect = chai.expect;

  describe('inventory controller', function() {
    let InventoryController;
    let mockInventoryService = {};

    beforeEach(module('inventory'));

    beforeEach(module(function($provide) {
      $provide.value('InventoryService', mockInventoryService);
    }));

    beforeEach(inject(function($controller) {
      mockInventoryService.getAllItems = function getAllItems() {
        return [
          {name: 'laptop', price: 1000, discount: 300, color: 'grey', quantity: 10}
        ];
      };
      mockInventoryService.addItem = function addItem(argOne) {
        mockInventoryService.addItem.numTimesCalled++;
        return;
      };
      mockInventoryService.addItem.numTimesCalled = 0;

      InventoryController = $controller('InventoryController');
    }));

    it('should do stuff', function() {
      expect(InventoryController.newItem).to.be.an('object');
      expect(InventoryController.all).to.be.an('array');
      expect(InventoryController.add).to.be.a('function');
    });

    it('should call addItem when adding', function() {
      expect(mockInventoryService.addItem.numTimesCalled).to.equal(0);
      InventoryController.add({});
      expect(mockInventoryService.addItem.numTimesCalled).to.equal(1);
    });


  });




}());
