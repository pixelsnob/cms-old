
define([
  'backbone'
], function(Backbone) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      
    },
    initialize: function() {
      // Add CMS functionality if user is logged in
      if (window.app_data.logged_in) {
        require([ 'views/cms' ], _.bind(function(CmsView) {
          this.cms_view = new CmsView({ el: this.$el });
        }, this));
      }
    }
  });
});
