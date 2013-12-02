/**
 * Meta form view
 * 
 */
define([
  'backbone',
  'views/modal',
  'forms/cms/meta'
], function(Backbone, ModalView, MetaForm) {
  return ModalView.extend({
    initialize: function() {
      this.form = new MetaForm({
        model: this.model,
        fields: [ 'title', 'keywords', 'description' ]
      });
      this.$el.find('.modal-title').text('Edit meta information');
      this.$el.find('.modal-body').html(this.form.render().el);
      ModalView.prototype.initialize.apply(this);
    }
  });
});
