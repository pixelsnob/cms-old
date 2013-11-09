
require.config({
  enforceDefine: true,
  paths: {
    jquery:       '../bower_components/jquery/jquery',
    underscore:   '../bower_components/underscore-amd/underscore',
    backbone:     '../bower_components/backbone-amd/backbone',
    jade:         'jade',
    lunr:         '../bower_components/lunr.js/lunr',
    forms:        '../bower_components/backbone-forms/distribution.amd/backbone-forms',
    vex:          '../bower_components/vex/js/vex',
    'vex.dialog': '../bower_components/vex/js/vex.dialog'
  },
  shim: {
    jade:         { exports: 'jade' },
    lunr:         { exports: 'lunr' },
    'vex.dialog': { deps: [ 'vex' ], exports: 'vex' }
  }
});

define([
  'backbone',
  'products',
  'collections/products',
  'routers/router',
  'views/app',
  'modules/csrf'
], function(Backbone, products, ProductsCollection, AppRouter, AppView) {
  $(function() {
    var products_collection = new ProductsCollection;
    products_collection.listenTo(products_collection, 'reset', function() {
      var app_view = new AppView({
        products_collection: products_collection
      });
      new AppRouter({ app_view: app_view });
      Backbone.history.start({
        pushState: true,
        hashChange: false,
        silent: false 
      });
    });
    products_collection.reset(products);
  });
});

require.onError = function(err) {
  console.log(err.stack);
};

