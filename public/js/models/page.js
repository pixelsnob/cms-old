
define([ 'backbone' ], function(Backbone) {
  return Backbone.Model.extend({
    url: window.location.href,
    idAttribute: '_id',
    initialize: function() {

    },
    validate: function(attrs, opts) {
    }
  });
});
