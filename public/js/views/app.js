
define([
  'backbone',
  'views/products'
], function(Backbone, ProductsView) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      'click nav li.product a':  'showProductsByPath',
      'submit form':             'showProductsByPhrase'
    },
    initialize: function(opts) {
      this.products_view = new ProductsView({
        el: this.$el.find('#products')
      });
    },
    showProductsByPath: function(ev) {
      var a = this.$(ev.currentTarget);
      this.products_view.showProductsByPath(a.attr('path'));
      Backbone.history.navigate(a.attr('href'));
      return false;
    },
    showProductsByPhrase: function(ev) {
      var search = this.$el.find('input[name=search]').prop('value');
      this.products_view.showProductsByPhrase(search);
      return false;
    }
  });
});

