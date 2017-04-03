'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  'use strict';

  angular.module('inventory', []);
})();

(function () {
  'use strict';

  angular.module('inventory').controller('InventoryController', InventoryController);

  InventoryController.$inject = ['InventoryService'];

  var tax = 0.0575;

  /**
   * Creates InventoryController's constructor
   * @param {Object} InventoryService's item object
   */
  function InventoryController(InventoryService) {
    var vm = this;

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
      var discountPrice = item.price - item.discount;
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
})();

(function () {
  'use strict';

  angular.module('inventory').factory('InventoryService', InventoryService);

  /**
   * Creates a new Inventory Service
   */
  function InventoryService() {

    var items = JSON.parse(localStorage.getItem('items')) || [];

    /**
    * Adds an item to the inventory
    * @param  {String} name The item to add with a name, price, discount, color, and quantity
    * @return {void}
    */
    function addItem(item) {

      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
        return;
      }

      if (typeof item.name !== 'string' || item.name.length < 1) {
        return;
      }

      if (typeof item.color !== 'string') {
        return;
      }

      item.price = Number(item.price);
      if (Number.isNaN(item.price) || item.price < 0.01) {
        return;
      }

      item.discount = Number(item.discount);
      if (Number.isNaN(item.discount) || item.discount < 0.01) {
        return;
      }

      item.quantity = Number(item.quantity);
      if (Number.isNaN(item.quantity) || item.quantity < 0) {
        return;
      }

      items.push({
        id: 13,
        name: item.name,
        price: item.price,
        discount: item.discount,
        color: item.color,
        quantity: item.quantity
      });

      localStorage.setItem('items', angular.toJson(items));
    }

    /**
     * Gets the items in the array
     * @return {Array}
     */
    function getAllItems() {
      return items;
    }

    return {
      addItem: addItem,
      getAllItems: getAllItems
    };
  }
})();

//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
