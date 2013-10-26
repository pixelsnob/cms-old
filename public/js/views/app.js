
define([ 'backbone' ], function(Backbone) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      'click nav li.product a': 'showProducts'
    },
    showProducts: function(ev) {
      var href = this.$(ev.currentTarget).attr('href');
      Backbone.history.navigate(href, { trigger: true });
      return false;
    }
  });
});

