/**
 * Page view
 * 
 */
define([
  'backbone',
  'models/cms/page',
  'views/cms/content_blocks'
], function(Backbone, PageModel, ContentBlocksView) {
  return Backbone.View.extend({
    model: new PageModel,
    events: {
      'click .save a': 'save',
      'click .revert a': 'revert'
    },
    initialize: function() {
      this.model.fetch({
        success: _.bind(function(model) {
          // Init only after we have data
          //console.log(model.content_blocks);
          model.content_blocks.reset(model.get('content_blocks'));
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
      console.log('page model change');
      return
      this.$el.find('.save').show();
      this.$el.find('.revert').show();
    },
    hideSave: function() {
      console.log('page model sync');
      return;
      this.$el.find('.save').hide();
      this.$el.find('.revert').hide();
    },
    save: function(ev) {
      this.model.save({ wait: true });
      return false;
    },
    revert: function() {
      this.model.fetch();
      return false;
    }
  });
});
