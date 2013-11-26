
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
      this.model.fetch({
        success: _.bind(function(model) {
          // Init only after we have data
          this.content_blocks_view = new CmsContentBlocksView({
            el: this.$el,
            collection: model.content_blocks
          });
          this.listenTo(this.model, 'change', this.showSave);
          this.listenTo(this.model, 'sync', this.hideSave);
        }, this)
      });
    },
    showSave: function() {
      this.$el.find('.save').show();
    },
    hideSave: function() {
      this.$el.find('.save').hide();
    },
    save: function(ev) {
      this.model.save();
      return false;
    }
  });
});
