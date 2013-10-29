
define([
  'backbone',
  'models/product',
  'lunr'
], function(Backbone, ProductModel, lunr) {
  var ProductsCollection = Backbone.Collection.extend({
    url: '/products/all',
    model: ProductModel,
    filtered: null,
    index: lunr(function() {
      this.field('description');
      this.ref('_id');
    }),
    sort_attr: 'description',
    sort_dir: 1,
    initialize: function() {
      //console.log(this.filtered); 
    },
    filterProductsByPath: function(path) {
      return this.filtered.reset(this.where({ path: path }));
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
    },
  });
  ProductsCollection.prototype.filtered = new ProductsCollection;
  return ProductsCollection;
});
