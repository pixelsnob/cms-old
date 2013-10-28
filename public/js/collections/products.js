
define([ 'backbone', 'models/product' ], function(Backbone, ProductModel) {
  return Backbone.Collection.extend({
    url: '/products/all',
    model: ProductModel,
    sort_attr: 'description',
    sort_dir: 1,
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
    initialize: function() {
    
    }
  });
});
