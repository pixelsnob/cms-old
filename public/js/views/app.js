
define([
  'backbone',
  'collections/products',
  'views/products'
], function(Backbone, ProductsCollection, ProductsView) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      'click nav li.product a': 'showProductsByPath',
      'click #sort': 'sortProductsByAttr'
    },
    initialize: function(opts) {
      // Fetch products from server
      this.products = new ProductsCollection;
      this.products.fetch();
      // Create a new collection to store filtered results
      this.filtered_products = new ProductsCollection;
      // Pass the filtered collection to the products view
      var pv = this.products_view = new ProductsView({
        collection: this.filtered_products
      });
      this.filtered_products.on('reset sort', pv.render, pv);
    },
    sortProductsByAttr: function(ev) {
      this.filtered_products.sort_attr = 'description';
      this.filtered_products.sort_dir = -1;
      this.filtered_products.sort();
    },
    showProductsByPath: function(ev) {
      var a      = this.$(ev.currentTarget),
        products = this.products.where({ path: a.attr('path') });
      this.filtered_products.reset(products);
      Backbone.history.navigate(a.attr('href'));
      return false;
    }
  });
});

