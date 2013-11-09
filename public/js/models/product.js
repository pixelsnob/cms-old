
define([ 'backbone' ], function(Backbone) {
  return Backbone.Model.extend({
    idAttribute: '_id',
    initialize: function() {

    },
    validate: function(attrs, opts) {
      if (!attrs.description.length) {
        return 'no length';
      }
    }
  });
});
