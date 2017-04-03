(function() {
  'use strict';


  let expect = chai.expect;

  describe('inventory service', function() {
    let InventoryService;

    beforeEach(module('inventory'));

    beforeEach(inject(function(_InventoryService_) {
      InventoryService = _InventoryService_;
    }));

    afterEach(function() {
      localStorage.removeItem('items');
    });

    describe('addItem', function() {
      it('should be able to add an item with the correct info', function() {
        expect(InventoryService.getAllItems().length).to.equal(0);
        let now = Date.now();
        InventoryService.addItem(
          {name: 'laptop' + now, price: 1000, discount: 300, color: 'grey', quantity: 10}
        );
        let items = InventoryService.getAllItems();
        expect(items.length).to.equal(1);
        expect(items[0].name).to.equal('laptop' + now);
        expect(items[0].price).to.equal(1000);
        expect(items[0].discount).to.equal(300);
        expect(items[0].color).to.equal('grey');
        expect(items[0].quantity).to.equal(10);
      });

      it('should handle when the name is not a string', function() {
        expect(InventoryService.getAllItems().length).to.equal(0);
        InventoryService.addItem(
          {name: 345, price: 1000, discount: 50, color: 'grey', quantity: 20}
        );
        let items = InventoryService.getAllItems();
        expect(items.length).to.equal(0);
      });

      it('should reject if when the price is not a number', function() {
        expect(InventoryService.getAllItems().length).to.equal(0);
        InventoryService.addItem(
          {name: 'laptop', price: 'HEY', discount: 50, color: 'grey', quantity: 20}
        );
        let items = InventoryService.getAllItems();
        expect(items.length).to.equal(0);
      });

      it('should reject when the discount is not a number', function() {
        expect(InventoryService.getAllItems().length).to.equal(0);
        InventoryService.addItem(
          {name: 'laptop', price: 1000, discount: 'HEY', color: 'grey', quantity: 20}
        );
        let items = InventoryService.getAllItems();
        expect(items.length).to.equal(0);
      });

      it('should reject when the quantity is not a number', function() {
        expect(InventoryService.getAllItems().length).to.equal(0);
        InventoryService.addItem(
          {name: 'laptop', price: 1000, discount: 100, color: 'grey', quantity: 'HEY'}
        );
        let items = InventoryService.getAllItems();
        expect(items.length).to.equal(0);
      });

      it('should reject the object if there is only two properties filled in', function() {
        expect(InventoryService.getAllItems().length).to.equal(0);
        InventoryService.addItem(
          {name: 'laptop', price: 1000}
        );
        let items = InventoryService.getAllItems();
        console.info(items);
        expect(items.length).to.equal(0);
      });

    });

    describe('getAllItems', function() {
      it('should return an array of items', function() {
        let result = InventoryService.getAllItems();
        expect(result).to.be.an('array');
      });
    });



  });

}());
