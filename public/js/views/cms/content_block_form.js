/**
 * Content block form
 * 
 */
define([
  'backbone',
  'views/modal',
  'forms/cms/content_block'
], function(Backbone, ModalView, ContentBlockForm) {
  return ModalView.extend({
    initialize: function() {
      this.form = new ContentBlockForm({
        model: this.model,
        fields: [ 'content' ]
      });
      ModalView.prototype.initialize.apply(this);
      this.$el.find('.modal-title').text('sex');
      this.$el.find('.modal-body').html(this.form.render().el);
    }
  });
});
