
define([ 'backbone', 'views/products' ], function(Backbone, ProductsView) {
  return Backbone.Router.extend({ 
    routes: {
      'products/:path': 'showProducts'
    },
    initialize: function() {
      this.products_view = new ProductsView;
    },
    showProducts: function(path) {
      this.products_view.render({ path: path });
    }
  });
});

