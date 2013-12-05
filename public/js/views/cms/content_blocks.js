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
    content_blocks: [],
    collection: ContentBlocksCollection,
    initialize: function(opts) {
      if (_.isArray(opts.content_blocks)) {
        this.collection.fetch({ data: { content_blocks: opts.content_blocks.join(',') }});
      }
    },
    add: function(model) {
      var view = new ContentBlockView({
        el: this.$('#' + model.id),
        model: model
      });
      view.render();
    },
    render: function() {
      this.collection.each(this.add);
      return this.el;
    }
  });
});
