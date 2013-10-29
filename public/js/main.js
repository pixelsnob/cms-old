
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

define([ 'backbone', 'views/app' ], function(Backbone, AppView) {
  $(function() {
    new AppView;
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: true
    });
  });
});

require.onError = function(err) {
  console.log('require.onError: ' + err);
};

