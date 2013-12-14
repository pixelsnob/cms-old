/**
 * Options form view
 * 
 */
define([
  'backbone',
  'forms/cms/options',
  'jade',
  'bootstrap'
], function(Backbone, OptionsForm, jade) {
  return Backbone.View.extend({
    events: {
      'click .btn-primary':  'save'
    },
    initialize: function() {
      this.setElement(jade.render('modal'));
    },
    render: function() {
      this.form = new OptionsForm({
        model: this.model,
        fields: [ 'title', 'keywords', 'description' ]
      });
      return this.form.render().el;
    },
    modal: function() {
      this.$el.modal({ backdrop: 'static', keyboard: true });
      this.$el.find('.modal-title').text('Page options');
      this.$el.find('.modal-body').html(this.render());
    },
    save: function(ev) {
      var errors = this.form.commit();
      if (typeof errors == 'undefined') {
        this.$el.modal('hide');
      }
      return false;
    }
  });
});
