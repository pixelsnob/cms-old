/**
 * Modal base view
 * 
 */
define([
  'backbone',
  'jade',
  'bootstrap'
], function(Backbone, jade) {
  return Backbone.View.extend({
    events: {
      'click .btn-primary':  'save'
    },
    modal_opts: { backdrop: 'static', keyboard: true },
    initialize: function() {
      this.setElement(jade.render('modal'));
      // Make sure form stays updated, since we only render it once
      this.listenTo(this.model, 'change', function(model) {
        _.each(this.form.fields, _.bind(function(field, name) {
          var obj = {};
          obj[name] = this.model.get(name);
          this.form.setValue(obj);
        }, this));
      });
    },
    save: function(ev) {
      var errors = this.form.commit();
      if (typeof errors == 'undefined') {
        this.$el.modal('hide');
      }
      return false;
    },
    render: function() {
      return this.el;
    },
    modal: function() {
      this.$el.modal(this.modal_opts);
    }
  });
});
