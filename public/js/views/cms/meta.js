/**
 * Meta form view
 * 
 */
define([
  'backbone',
  'forms/cms/meta',
  'jade',
  'modules/events',
  'bootstrap'
], function(Backbone, MetaForm, jade, events) {
  return Backbone.View.extend({
    events: {
      'click .btn-primary':  'save'
    },
    template: this.$(jade.render('modal')),
    initialize: function() {
      this.setElement(this.template);
      this.form = new MetaForm({
        model: this.model,
        fields: [ 'title', 'keywords', 'description' ]
      });
      this.$el.find('.modal-title').text('Edit meta information');
      this.$el.find('.modal-body').html(this.form.render().el);
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
      this.render();
      this.$el.modal();
    }
  });
});
