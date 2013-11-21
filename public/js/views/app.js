
define([
  'backbone'
], function(Backbone) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      
    },
    initialize: function() {
      // Add CMS functionality if user is logged in
      if (window.app_data.user && window.app_data.page) {
        require([ 'views/cms' ], _.bind(function(CmsView) {
          _.defaults(this, CmsView.prototype);
          _.defaults(this.events, CmsView.prototype.events);
          CmsView.prototype.initialize.apply(this);
        }, this));
      }
    }
  });
});
