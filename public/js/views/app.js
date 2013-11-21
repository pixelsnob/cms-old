
define([
  'backbone',
  'views/page'
  //'views/mixins/editable'
  //'views/flash_message'
], function(Backbone, PageView) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      'click #content': function() { alert('?'); }      
    },
    initialize: function(opts) {
      this.page_view = new PageView({ el: this.$el }); 
    }
  });
});
