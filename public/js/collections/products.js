
define([
  'backbone',
  'models/product',
  'lunr',
  'vent'
], function(Backbone, ProductModel, lunr, vent) {
  var ProductsCollection = Backbone.Collection.extend({
    url: '/products/all',
    model: ProductModel,
    filtered: null, // See below
    // Search index
    index: lunr(function() {
      this.field('description');
      this.field('aka');
      this.field('maker');
      this.ref('_id');
    }),
    sort_attr: 'description',
    sort_dir: 1,
    initialize: function() {
      var obj = this;
      this.listenTo(this, 'reset', function() {
        obj.populateIndex();
        vent.trigger('products:loaded');
      });
    },
    populateIndex: function() {
      var obj = this;
      _.each(this.models, function(product) {
        obj.index.add(product.toJSON());
      });
    },
    all: function() {
      return this.filtered.reset(this.models);
    },
    filterProductsByPath: function(path) {
      return this.filtered.reset(this.where({ path: path }));
    },
    filterProductsByPhrase: function(phrase) {
      var search  = this.index.search(phrase),
        products  = [],
        obj       = this;
      _.each(search, function(product) {
        products.push(obj.findWhere({ _id: product.ref }));
      });
      return this.filtered.reset(products);
    },
    comparator: function(a, b) {
      var a = a.get(this.sort_attr),
          b = b.get(this.sort_attr);
      if (a == b) { return 0; }
      if (this.sort_dir == -1) {
        return (a < b ? 1 : -1);
      } else {
        return (a > b ? 1 : -1);
      }
    }
  });

  // Attach a sub-collection to store filtered models
  var ProductsFilteredCollection = Backbone.Collection.extend({
    // Copy only what we need
    model:      ProductsCollection.prototype.model,
    comparator: ProductsCollection.prototype.comparator,
    sort_attr:  ProductsCollection.prototype.sort_attr,
    sort_dir:   ProductsCollection.prototype.sort_dir
  });
  ProductsCollection.prototype.filtered = new ProductsFilteredCollection;
  return ProductsCollection;
});

