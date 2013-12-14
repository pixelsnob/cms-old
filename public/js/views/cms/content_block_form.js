/**
 * Content block form
 * 
 */
define([
  'backbone',
  'forms/cms/content_block',
  'jade',
  'bootstrap'
], function(Backbone, ContentBlockForm, jade) {
  return Backbone.View.extend({
    events: {
      'click .btn-primary':  'save'
    },
    initialize: function() {
      this.setElement(jade.render('modal'));
    },
    render: function() {
      this.form = new ContentBlockForm({
        model: this.model,
        fields: [ 'content' ]
      });
      this.$el.find('.modal-title').text('Edit Content Block');
      this.$el.find('.modal-body').html(this.form.render().el);
      return this;
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
    }
  });
});
