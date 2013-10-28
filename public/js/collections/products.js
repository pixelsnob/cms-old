
define([ 'backbone', 'models/product' ], function(Backbone, ProductModel) {
  var self = this;  
  return Backbone.Collection.extend({
    url: '/products/all',
    model: ProductModel,
    initialize: function() {
    
    },
    filterBy: function(attr, val) {
      var where = (function() {
        var obj = {};
        obj[attr] = val;
        return obj;
      })();
      var models = this.where(where);
      return models;
    }
  });
});
