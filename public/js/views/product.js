
define([
  'backbone',
  'models/product',
  'jade'
], function(Backbone, ProductModel, jade) {
  return ProductView = Backbone.View.extend({
    tagName: 'li',
    model: ProductModel,
    busy: false,
    initialize: function(opts) {
      this.setElement(jade.render('product', { product: this.model.toJSON() }));
    },
    render: function() {
      return this.el;
    }
  });
});
