/**
 * CMS page model
 * 
 */
define([
  'backbone',
  'collections/cms/content_blocks'
], function(Backbone, ContentBlocksCollection) {
  return Backbone.Model.extend({
    url: window.location.href,
    idAttribute: '_id',
    content_blocks: new ContentBlocksCollection,
    initialize: function() {
      this.listenTo(this, 'change:content_blocks', function(model) {
        this.content_blocks.set(model.get('content_blocks'));
      });
      this.listenTo(this.content_blocks, 'change', function(model) {
        this.set('content_blocks', this.content_blocks.toJSON()); 
      });
    }
  });
});
