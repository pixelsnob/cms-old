/**
 * Form for editing meta tag data
 * 
 */
define([
  'backbone',
  'bootstrap',
  'jade'
], function(Backbone, bootstrap, jade) {
  return Backbone.View.extend({
    events: {
    },
    template: jade.render('modal'),
    initialize: function() {
      this.setElement(this.template);
      this.form = new Backbone.Form({ model: this.model });
    },
    render: function() {
      this.$el.find('.modal-body').append(this.form.render().el);
      this.$el.find('.modal-title').text('Edit meta information');
      return this.el;
    }
  });
});
