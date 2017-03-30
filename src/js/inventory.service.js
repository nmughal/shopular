(function() {
  'use strict';

  angular.module('inventory')
    .factory('InventoryService', InventoryService);

    function InventoryService(){
      console.log('Creating a new InventoryService');

      let items = JSON.parse(localStorage.getItem('items')) || [];


      /**
      * Adds a name to the list
      * @param  {String} name The item to add with a name, price, discount, color, and quantity
      * @return {void}
      */
      function addItem(item) {
        if(typeof(item) !== 'object' || typeof(item.name) !== 'string' || item.name.length < 1) {
          return;
        }

        item.price = Number(item.price);
        if(Number.isNan(item.price) || item.price < 0.01) {
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

        vm.newItem = {};

      }

      function getAllItems() {
        return items;
      }


      return {
        addItem: addItem,
        getAllItems: getAllStudents
      };

    }




}());
