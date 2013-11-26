
define([
  'backbone',
  'models/page',
  'views/content_blocks'
], function(Backbone, PageModel, ContentBlocksView) {
  return Backbone.View.extend({
    model: new PageModel,
    events: {
      'click .save': 'save'
    },
    initialize: function() {
      this.model.fetch({
        success: _.bind(function(model) {
          // Init only after we have data
          this.content_blocks_view = new ContentBlocksView({
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
