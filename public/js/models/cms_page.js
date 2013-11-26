
define([
  'backbone',
  'collections/cms_content_blocks'
], function(Backbone, CmsContentBlockCollection) {
  return Backbone.Model.extend({
    url: window.location.href,
    idAttribute: '_id',
    content_blocks: new CmsContentBlockCollection,
    initialize: function() {
      // Populate content_blocks on load
      this.listenToOnce(this, 'change', _.bind(function(model) {
        this.content_blocks.reset(model.get('content_blocks'));
      }, this));
      // Make sure model has latest values from content_blocks collection
      this.listenTo(this.content_blocks, 'change', _.bind(function() {
        this.set('content_blocks', this.content_blocks);
      }, this));
    }
  });
});
