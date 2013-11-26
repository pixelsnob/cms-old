
define([
  'backbone',
  'models/content_block'
], function(Backbone, ContentBlockModel) {
  return Backbone.Collection.extend({
    model: ContentBlockModel,
    initialize: function(opts) {
    }
  });
});
