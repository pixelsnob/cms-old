
define([
  'backbone'
  //'views/cms_page'
], function(Backbone, PageView) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      'click .logout a': function() { alert('wow'); return false; }  
    },
    initialize: function(opts) {
    },
    caca: function() {}
  });
});
