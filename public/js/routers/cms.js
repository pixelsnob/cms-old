
/**
 * Main router
 * 
 */
define([
  'backbone',
  'views/app'
], function(Backbone, AppView) {
  return Backbone.Router.extend({ 
    routes: {
      '/edit':                'test'
    },
    initialize: function(opts) {
      //this.app_view = (opts.app_view instanceof Backbone.View ? opts.app_view :
      //  new AppView);
    },
    test: function() {

    }
  });
});
