
define([
  'backbone',
  'models/cms_page',
  'views/cms_content_blocks'
], function(Backbone, CmsPageModel, CmsContentBlocksView) {
  return Backbone.View.extend({
    model: new CmsPageModel,
    events: {
      'click .save': 'save'
    },
    initialize: function() {
      this.content_blocks_view = new CmsContentBlocksView({ el: this.$el });
      this.model.fetch({
        success: _.bind(function(model) {
          this.content_blocks_view.collection.reset(
            model.get('content_blocks'));
        }, this)
      });
    },
    save: function(ev) {
      // this is gross, there must be a better way...
      this.model.set('content_blocks', this.content_blocks_view.collection);
      this.model.save();
      return false;
    }
  });
});
