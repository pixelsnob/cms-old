
/**
 * Main router
 * 
 */
define([
  'backbone',
  'views/app'
], function(Backbone, AppView) {
  return Backbone.Router.extend({ 
    routes: {
      'products/all':    'showAllProducts',
      'products/:path':  'showProductsByPath',
      '':                'showHome'
    },
    initialize: function(opts) {
      this.app_view = (opts.app_view instanceof Backbone.View ? opts.app_view :
        new AppView);
    },
    showHome: function() {
      this.app_view.showHome();
    },
    showProductsByPath: function(path) {
      this.app_view.showProductsByPath(path);
    },
    showAllProducts: function() {
      this.app_view.showAllProducts();
    }
  });
});
