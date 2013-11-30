/**
 * CMS page model
 * 
 */
define([
  'backbone',
  'collections/cms/content_blocks'
], function(Backbone, ContentBlocksCollection) {
  return Backbone.Model.extend({
    url: window.location.pathname,
    idAttribute: '_id',
    content_blocks: new ContentBlocksCollection,
    storage: window.localStorage,
    initialize: function() {
      this.listenTo(this, 'change:content_blocks', function(model) {
        this.content_blocks.set(model.get('content_blocks'));
      });
      this.listenTo(this.content_blocks, 'change', function(model) {
        this.set('content_blocks', this.content_blocks.toJSON()); 
      });
    },
    saveLocal: function() {
      if (typeof this.storage != 'undefined') {
        this.storage.setItem(this.url, JSON.stringify(this));
      }
    },
    fetchLocal: function() {
      if (typeof this.storage != 'undefined') {
        return JSON.parse(this.storage.getItem(this.url));
      }
    }/*,
    fetch: function(opts) {
      if (this.storage.length) {
        this.set(this.fetchLocal());
        if (typeof opts.success == 'function') {
          opts.success(this);
        }
      } else {
        return Backbone.Model.prototype.fetch.call(this, opts);
      }
    }*/
  });
});
