
require.config({
  enforceDefine: true,
  paths: {
    jquery:         '../bower_components/jquery/jquery',
    underscore:     '../bower_components/underscore/underscore',
    backbone:       '../bower_components/backbone/backbone',
    jade:           'jade',
    lunr:           '../bower_components/lunr.js/lunr'
  },
  shim: {
    jquery: { exports: '$' },
    underscore: { exports: '_' },
    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },
    jade: { exports: 'jade' },
    lunr: { exports: 'lunr' }
  }
});

define([
  'backbone',
  'routers/router',
  'views/app',
  'products'
], function(Backbone, AppRouter, AppView, products) {
  var app_view = new AppView;
  app_view.products_view.collection.on('reset', function() {
    // Only start things when products are loaded
    new AppRouter({ app_view: app_view });
    $(function() {
      Backbone.history.start({
        pushState: true,
        hashChange: false,
        silent: false 
      });
    });
  });
  // Load all products
  app_view.products_view.collection.reset(products);
});

require.onError = function(err) {
  console.log('require.onError: ' + err);
};

