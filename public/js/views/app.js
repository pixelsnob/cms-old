
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
        require([ 'views/cms_page' ], _.bind(function(CmsPageView) {
          this.cms_page_view = new CmsPageView({ el: this.$el });
        }, this));
      }
    }
  });
});
