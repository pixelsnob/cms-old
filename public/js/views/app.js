
define([
  'backbone',
  'collections/products',
  'views/products'
], function(Backbone, ProductsCollection, ProductsView) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      'click nav li.product a': 'showProducts'
    },
    initialize: function(opts) {
      this.products = new ProductsCollection;
      this.products.fetch();
      this.filtered = new ProductsCollection;
      this.products_view = new ProductsView({
        collection: this.filtered
      });
    },
    showProducts: function(ev) {
      var a = this.$(ev.currentTarget);
      this.filtered.reset(this.products.filterBy('path', a.attr('path')));
      Backbone.history.navigate(a.attr('href'));
      return false;
    }
  });
});

