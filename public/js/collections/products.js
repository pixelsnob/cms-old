
define([ 'backbone', 'models/product' ], function(Backbone, ProductModel) {
  return Backbone.Collection.extend({
    url: '/products/all',
    model: ProductModel,
    initialize: function() {
      
    }
  });
});
