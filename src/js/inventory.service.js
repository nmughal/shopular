(function() {
  'use strict';

  angular.module('inventory')
    .factory('InventoryService', InventoryService);

    /**
     * Creates a new Inventory Service
     */
    function InventoryService(){

      let items = JSON.parse(localStorage.getItem('items')) || [];


      /**
      * Adds an item to the inventory
      * @param  {String} name The item to add with a name, price, discount, color, and quantity
      * @return {void}
      */
      function addItem(item) {

        if(typeof(item) !== 'object') {
          return;
        }

        if(typeof(item.name) !== 'string' || item.name.length < 1) {
          return;
        }

        if(typeof(item.color) !== 'string'){
          return;
        }

        item.price = Number(item.price);
        if(Number.isNaN(item.price) || item.price < 0.01) {
          return;
        }

        item.discount = Number(item.discount);
        if(Number.isNaN(item.discount) || item.discount < 0.01) {
          return;
        }

        item.quantity = Number(item.quantity);
        if(Number.isNaN(item.quantity) || item.quantity < 0) {
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




}());
