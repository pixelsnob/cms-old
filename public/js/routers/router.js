
define([
  'backbone',
  'views/app'
], function(Backbone, AppView) {
  return Backbone.Router.extend({ 
    routes: {
      'products/all': 'showAllProducts',
      'products/:path': 'showProducts'
    },
    initialize: function(opts) {
      this.app_view = (opts.app_view instanceof Backbone.View ? opts.app_view :
        new AppView);
    },
    showProducts: function(path) {
      this.app_view.products_view.showProductsByPath(path);
    },
    showAllProducts: function() {
      this.app_view.products_view.showAllProducts();
    }
  });
});
