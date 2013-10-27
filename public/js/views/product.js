
define([ 'backbone', 'models/product', 'jade' ], function(Backbone, ProductModel, jade) {
  return Backbone.View.extend({
    tagName: 'li',
    render: function() {
      return jade.render('product', { product: this.model.toJSON() });
    }
  });
});

