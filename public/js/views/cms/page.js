/**
 * Page view
 * 
 */
define([
  'backbone',
  'models/cms/page',
  'views/cms/content_blocks',
  'modules/dialog'
], function(Backbone, PageModel, ContentBlocksView, dialog) {
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
      dialog.open({
        content: 'test'
      });
      return false;
    },
    error: function(model, xhr, opts) {
      if (typeof xhr.responseJSON.errors == 'object') {
        var res = xhr.responseJSON;
        dialog.confirm({
          message: res.message + ': revert?',
          callback: _.bind(function(val) {
            if (val) {
              this.revert();
            }
          }, this)
        });
        return;
      }
      if (xhr.status === 403) {
        dialog.alert({
          message: 'You must be logged in to do that...',
          callback: function() {
            window.location.href = '/login';
          }
        });
      } else {
        return alert('An error has occurred');
      }
    }
  });
});
