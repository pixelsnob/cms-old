/**
 * App base model
 * 
 */
define([
  'backbone'
], function(Backbone) {
  return Backbone.Model.extend({
    storage: window.localStorage,
    saveLocal: function() {
      if (typeof this.storage != 'undefined') {
        this.storage.setItem(this.url, JSON.stringify(this));
      }
    },
    fetchLocal: function() {
      if (typeof this.storage != 'undefined') {
        return JSON.parse(this.storage.getItem(this.url));
      }
    }
  });
});
