
define([
  'backbone',
  'collections/cms_content_blocks'
], function(Backbone, CmsContentBlockCollection) {
  return Backbone.Model.extend({
    url: window.location.href,
    idAttribute: '_id',
    initialize: function() {
      // Set up content block sub collection
      /*this.on('reset', _.bind(function() {
        this.content_blocks = new CmsContentBlockCollection(
          this.get('content_blocks'));  
        /*this.listenTo(this.content_blocks, 'change', function() {
          this.trigger('change');
        });*/
      //}, this));*/
    },
    validate: function(attrs, opts) {
    }
  });
});
