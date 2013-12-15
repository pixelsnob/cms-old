/**
 * Modal form base view
 * 
 */
define([
  'backbone',
  'jade',
  'bootstrap'
], function(Backbone, jade) {
  return Backbone.View.extend({
    events: {
      'click .save':    'save',
      'click .cancel':  'cancel'
    },
    initialize: function() {
      this.setElement(jade.render('modal'));
    },
    modal: function() {
      this.$el.modal({ backdrop: 'static', keyboard: true });
    },
    save: function(ev) {
      var errors = this.form.commit();
      if (typeof errors == 'undefined') {
        this.$el.modal('hide');
      }
      return false;
    },
    cancel: function(ev) {
      /*var msg = 'Are you sure? Unsaved changes will be lost!';
      if (confirm(msg)) {
        this.$el.modal('hide');
      }*/
      this.$el.modal('hide');
      return false;
    }
  });
});
