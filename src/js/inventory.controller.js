(function() {
  'use strict';

  angular.module('inventory')
    .controller('InventoryController', InventoryController);

  InventoryController.$inject = ['InventoryService'];

  let tax = 0.0575;

  /**
   * Creates InventoryController's constructor
   * @param {Object} InventoryService's item object
   */
  function InventoryController(InventoryService) {
    let vm = this;

    vm.newItem = {};

    vm.sortType = 'price';
    vm.sortReverse = false;

    vm.items = InventoryService.getAllItems();

    vm.add = function add(item) {
      InventoryService.addItem(item);
      vm.newItem = {};
    };

    vm.tax = tax;

    /**
    * Gets price of items by subtracting item's discount from it's price
    * and then multiplying it by the tax (1.0575)
    * @param  {Object}   item  Takes in the controller's object
    * @return {number}         The final price
    */
    vm.itemPrice = function itemPrice(item) {
      let discountPrice = item.price - item.discount;
      return discountPrice * (tax + 1);
    };


    /**
     * Change the order of the list of items
     * @param  {String} sortField String of the item
     * @return {void}
     */
    vm.changeSort = function changeSort(sortField) {
      vm.sortType = sortField;
      vm.sortReverse = !vm.sortReverse;
    };


  }

}());
