/**
 * CMS page model
 * 
 */
define([
  'backbone',
  'models/base',
  'collections/cms/content_blocks',
  'forms'
], function(Backbone, BaseModel, ContentBlocksCollection) {
  //console.log(Backbone);
  return BaseModel.extend({
    url: window.location.pathname,
    idAttribute: '_id',
    content_blocks: new ContentBlocksCollection,
    schema: {
      title: 'Text'
    },
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
