
define([ 'backbone', 'models/product' ], function(Backbone, ProductModel) {
  var self = this;  
  return Backbone.Collection.extend({
    url: '/products/all',
    model: ProductModel,
    initialize: function() {
      var coll = Backbone.Collection.extend({
        model: this.model
      });
      this.filtered = new coll;
    },
    filterBy: function(attr, val) {
      var models = this.where((function() {
        var obj = {};
        obj[attr] = val;
        return obj;
      })());
      return this.filtered.reset(models);
    }
  });
});
