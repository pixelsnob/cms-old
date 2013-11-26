/**
 * Content block editor view
 * 
 */
define([
  'backbone'
], function(Backbone, markdown) {
  return Backbone.View.extend({
    events: {
    },
    initialize: function(opts) {
      this.setElement(this.el);
    },
    render: function() {
      var editor = $('<textarea>').val(this.model.get('content'));
      this.$el.empty();
      this.$el.append(editor);
      editor.focus();
      return this.el;
    }
  });
});
