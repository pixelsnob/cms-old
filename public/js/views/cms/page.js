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
      'click .save_local a': 'saveLocal',
      'click .revert a': 'revert'
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.saveLocal);
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
    error: function(model, xhr, opts) {
      if (typeof xhr == 'undefined') {
        return alert('An error has occurred');
      }
      if (typeof xhr.status != 'undefined') {
        if (xhr.status === 403) {
          return alert('You must be logged in to do that...');
        } else if (xhr.status === 404) {
          return alert('An error has occurred');
        }
      }
      if (typeof xhr.responseJSON.errors == 'object') {
        var res = xhr.responseJSON;
        if (typeof res.message == 'string') {
          var msg = res.message + ': revert?';
          if (confirm(msg) === true) {
            this.revert();
          }
        }
      }
    }
  });
});
