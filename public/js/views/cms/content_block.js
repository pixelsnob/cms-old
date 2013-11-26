/**
 * Content block view
 * 
 */
define([
  'backbone',
  'markdown'
], function(Backbone, markdown) {
  return Backbone.View.extend({
    events: {
      'click':            'edit',
      'click textarea':   function(ev) { ev.stopPropagation(); },
      'blur textarea':    'render'
    },
    initialize: function() {
      this.setElement(this.el);
      this.$el.addClass('editable');
    },
    edit: function() {
      var editor = $('<textarea>').val(this.model.get('content'));
      this.$el.empty();
      this.$el.append(editor);
      editor.focus();
    },
    render: function() {
      var content = this.$el.find('textarea').val();
      this.model.set('content', content);
      if (this.model.get('type') == 'markdown') {
        content = markdown(content);
      }
      this.$el.empty();
      this.$el.append(content);
      return this;
    }
  });
});
