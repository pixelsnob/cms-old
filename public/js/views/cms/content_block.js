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
      'blur textarea':    'save'
    },
    initialize: function() {
      this.setElement(this.el);
      this.$el.addClass('editable');
      this.listenTo(this.model, 'change', function(model) {
        this.render();
      });
    },
    edit: function() {
      var editor = $('<textarea>').val(this.model.get('content'));
      this.$el.empty();
      this.$el.append(editor);
      editor.focus();
    },
    save: function() {
      var content = this.$el.find('textarea').val();
      this.model.set('content', content);
      this.render();
    },
    render: function() {
      var content = this.model.get('content');
      if (this.model.get('type') == 'markdown') {
        content = markdown(content);
      }
      this.$el.empty();
      this.$el.append(content);
      return this;
    }
  });
});
