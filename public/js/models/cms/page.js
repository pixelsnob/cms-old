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
      this.listenTo(this, 'sync', function(model) {
        this.content_blocks.set(model.get('content_blocks'));
      });
    },
    save: function(attrs, opts) {
      this.set('content_blocks', this.content_blocks.toJSON());
      Backbone.Model.prototype.save.call(this, attrs, opts);
    }
  });
});
