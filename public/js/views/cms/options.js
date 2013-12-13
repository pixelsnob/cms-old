/**
 * Options form view
 * 
 */
define([
  'backbone',
  'views/modal',
  'forms/cms/options'
], function(Backbone, ModalView, OptionsForm) {
  return ModalView.extend({
    initialize: function() {
      this.form = new OptionsForm({
        model: this.model,
        fields: [ 'title', 'keywords', 'description' ]
      });
      ModalView.prototype.initialize.apply(this);
      this.$el.find('.modal-title').text('Page options');
      this.$el.find('.modal-body').html(this.form.render().el);
    }
  });
});
