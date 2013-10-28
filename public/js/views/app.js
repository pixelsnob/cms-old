
define([
  'backbone',
  'collections/products',
  'views/products'
], function(Backbone, ProductsCollection, ProductsView) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      'click nav li.product a': 'showProductsByPath'
    },
    initialize: function(opts) {
      this.products = new ProductsCollection;
      this.products.fetch();
      this.products_view = new ProductsView;
    },
    showProductsByPath: function(ev) {
      var a      = this.$(ev.currentTarget),
        products = this.products.filterBy('path', a.attr('path'));
      this.products_view.collection.reset(products);
      Backbone.history.navigate(a.attr('href'));
      return false;
    }
  });
});

