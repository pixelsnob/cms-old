
define([
  'backbone',
  'views/app',
  //'modules/vent',
  'collections/products',
  'products',
  //'forms',
  'modules/csrf'
], function(Backbone, AppView, ProductsCollection, products) {
  var App = function() {};
  App.prototype.initialize = function() {
    this.products_collection = new ProductsCollection(products);
    this.app_view = new AppView;
  };
  return App;
});
