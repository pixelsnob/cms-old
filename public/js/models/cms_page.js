
define([
  'backbone',
  'collections/cms_content_blocks'
], function(Backbone, CmsContentBlockCollection) {
  return Backbone.Model.extend({
    url: window.location.href,
    idAttribute: '_id',
    initialize: function() {
    },
    validate: function(attrs, opts) {
    }
  });
});
