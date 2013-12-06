/**
 * CMS page model
 * 
 */
define([
  'backbone',
  'models/base',
  'collections/cms/content_blocks'
], function(Backbone, BaseModel, ContentBlocksCollection) {
  return BaseModel.extend({
    url: window.location.pathname,
    idAttribute: '_id',
    content_blocks: new ContentBlocksCollection,
    saved: {},
    initialize: function() {
      this.listenTo(this, 'change:content_blocks', function(model) {
        this.content_blocks.set(model.get('content_blocks'));
      });
      this.listenTo(this.content_blocks, 'change', function(model) {
        this.set('content_blocks', this.content_blocks.toJSON()); 
      });
      this.listenTo(this, 'sync', function(model) {
        this.saved = _.clone(this.attributes);
      });
    },
    revert: function() {
      this.set(this.saved);
    },
    hasChanged: function() {
      return !_.isEqual(this.saved, this.attributes);
    }
  });
});
