
define([ 'backbone', 'models/product' ], function(Backbone, ProductModel) {
  return Backbone.View.extend({
    tagName: 'li',
    render: function() {
      this.$el.text(this.model.get('description'));
      return this.el;
    }
  });
});

