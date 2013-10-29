
define([ 'backbone', 'models/product', 'jade' ], function(Backbone, ProductModel, jade) {
  return Backbone.View.extend({
    tagName: 'li',
    events: {
      
    },
    render: function() {
      this.$el.html(jade.render('product', { product: this.model.toJSON() }));
      return this.el;
    }
  });
});

