
define([
  'backbone',
  'collections/products',
  'views/product'
],
function(Backbone, ProductsCollection, ProductView) {
  return Backbone.View.extend({
    el: 'ul.products',
    events: {
    },
    collection: ProductsCollection,
    initialize: function() {
        
    },
    render: function() {
      var el = this.$el;
      el.html('');
      this.collection.forEach(function(product) {
        var view = new ProductView({ model: product });
        el.append(view.render());
      });
      return el;
    }
  });
});

