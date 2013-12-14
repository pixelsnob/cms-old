/**
 * Content block view
 * 
 */
define([
  'backbone',
  'markdown',
  'views/cms/content_block_form'
], function(Backbone, markdown, ContentBlockFormView) {
  return Backbone.View.extend({
    events: {
      'click':            'modal'
    },
    initialize: function() {
      this.setElement(this.el);
      this.$el.addClass('editable');
      this.listenTo(this.model, 'change', this.render);
    },
    modal: function() {
      var form_view = new ContentBlockFormView({ model: this.model });
      form_view.render().modal();
      form_view.modal();
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
