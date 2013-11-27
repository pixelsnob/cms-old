/**
 * Content blocks view
 * 
 */
define([
  'backbone',
  'views/cms/content_block',
  'collections/cms/content_blocks'
], function(Backbone, ContentBlockView, ContentBlocksCollection) {
  return Backbone.View.extend({
    events: {
    },
    views: [],
    collection: ContentBlocksCollection,
    initialize: function(opts) {
      this.collection.each(_.bind(function(model) {
        var el = this.$el.find('#' + model.get('_id'));
        this.views.push(new ContentBlockView({ el: el, model: model }));
      }, this));
    }
  });
});
