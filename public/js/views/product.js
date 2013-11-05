
define([
  'backbone',
  'models/product',
  'jade'
], function(Backbone, ProductModel, jade) {
  return Backbone.View.extend({
    tagName: 'li',
    model: ProductModel,
    events: {
    },
    initialize: function(opts) {
    },
    render: function() {
      var tpl = jade.render('product', { product: this.model.toJSON() });
      this.setElement(tpl);
      return this.el;
    }
  });
});
