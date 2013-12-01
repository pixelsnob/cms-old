/**
 * Page view
 * 
 */
define([
  'backbone',
  'models/cms/page',
  'views/cms/content_blocks',
  'bootstrap',
  'views/cms/meta'
], function(Backbone, PageModel, ContentBlocksView, bootstrap, MetaView) {
  return Backbone.View.extend({
    model: new PageModel,
    events: {
      'click .save a':           'save',
      'click .save_local a':     'saveLocal',
      'click .revert a':         'revert',
      'click .edit_meta a':      'editMeta',
    },
    initialize: function() {
      this.listenTo(this.model, 'sync', this.hideSave);
      this.listenTo(this.model, 'error', this.error);
      this.model.fetch({
        success: _.bind(function(model) {
          this.content_blocks_view = new ContentBlocksView({
            el: this.$el,
            collection: model.content_blocks
          });
          this.listenTo(this.model, 'change', this.showSave);
        }, this)
      });
    },
    showSave: function() {
      this.$el.find('.save').show();
      this.$el.find('.revert').show();
    },
    hideSave: function() {
      this.$el.find('.save').hide();
      this.$el.find('.revert').hide();
    },
    save: function(ev) {
      this.model.save(this.model.attributes, { wait: true });
      return false;
    },
    saveLocal: function(ev) {
      this.model.saveLocal();
      return false;
    },
    revert: function() {
      this.model.fetch();
      return false;
    },
    editMeta: function(ev) {
      var meta_view = new MetaView({ model: this.model });
      $(meta_view.render()).modal();
      return false;
    },
    error: function(model, xhr, opts) {
      if (typeof xhr.responseJSON != 'object') {
        alert('An error has occurred');
        return;
      }
      var res = xhr.responseJSON;
      if (typeof res.message == 'string') {
        if (confirm(res.message + ': revert?')) {
          this.revert();
        }
        return;
      }
      if (xhr.status === 403) {
        alert('You must be logged in to do that...');
        window.location.href = '/login';
      } else {
        alert('An error has occurred');
      }
    }
  });
});
