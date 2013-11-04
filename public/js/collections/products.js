
define([
  'collections/base',
  'models/product',
  'lunr',
  'vent'
], function(BaseCollection, ProductModel, lunr, vent) {
  return BaseCollection.extend({
    url: '/products/all',
    model: ProductModel,
    // Store filtered results here
    filtered: new BaseCollection,
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
      // Configure filtered collection
      _.extend(this.filtered, {
        model:      this.model,
        sort_attr:  this.sort_attr,
        sort_dir:   this.sort_dir,
        comparator: this.comparator
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
});

