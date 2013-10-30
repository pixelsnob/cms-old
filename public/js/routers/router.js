
define([ 'backbone', 'views/app' ], function(Backbone, AppView) {
  return Backbone.Router.extend({ 
    routes: {
      'products/:path': 'showProducts'
    },
    initialize: function() {
      this.app_view = new AppView;
    },
    showProducts: function(path) {
      this.app_view.products_view.showProductsByPath(path);
    }
  });
});
