
define([
  'backbone',
  'markdown',
  'views/cms_content_block',
  'views/cms_editable_content_block'
], function(Backbone, markdown, ContentBlockView, EditableContentBlockView) {
  return Backbone.View.extend({
    events: {
      'click .editable':            'edit',
      'click .editable textarea':   function(ev) { ev.stopPropagation(); },
      'blur  .editable textarea':   'save',
      'blur  .editable':            'editBlur'
    },
    initialize: function(opts) {
      this.collection.each(_.bind(function(block) {
        this.$el.find('#' + block.get('_id')).addClass('editable');
      }, this));
    },
    // Make editable
    edit: function(ev) {
      var el    = this.$(ev.currentTarget),
          model = this.collection.get(el.attr('id'));
      if (typeof model == 'undefined') {
        // show error
        return false;
      }
      var editor = new EditableContentBlockView({ el: el, model: model });
      editor.render();
    },
    // Save or restore
    save: function(ev) {
      var el     = this.$(ev.currentTarget).parent(),
          model  = this.collection.get(el.attr('id'));
      if (typeof model == 'undefined') {
        // show error
        return false;
      }
      var block = new ContentBlockView({ el: el, model: model });
      block.render();
    }
  });
});
