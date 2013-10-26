
define([ 'backbone', 'collections/products', 'views/product' ],
function(Backbone, ProductsCollection, ProductView) {
  return Backbone.View.extend({
    el: 'ul.products',
    // Fetch all of the products once
    initialize: function() {
      this.collection = new ProductsCollection;
      this.collection.fetch();
    },
    render: function(opts) {
      // Run a query on the fetched products for each path (category)
      var el     = this.$el,
        products = this.collection.where({ path: opts.path });
      // Populate
      el.html('');
      _.each(products, function(product) {
        var view = new ProductView({ model: product });
        el.append(view.render());
      });
    }
  });
});

