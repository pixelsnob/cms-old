
define([ 'backbone', 'models/product', 'jade' ], function(Backbone, ProductModel, jade) {
  return Backbone.View.extend({
    events: {
      //'click span': 'test'      
    },
    //test: function() {
    //},
    render: function() {
      var tpl = jade.render('product', { product: this.model.toJSON() });
      this.setElement(tpl);
      return this.el;
    }
  });
});

