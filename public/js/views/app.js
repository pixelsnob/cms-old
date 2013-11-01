
define([
  'backbone',
  'views/products'
], function(Backbone, ProductsView) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      'click nav li.product a':     'showProductsByPath',
      'keyup input[name=search]':   'showProductsByPhrase',
      'submit form':                'showProductsByPhrase'
    },
    initialize: function(opts) {
      this.products_view = new ProductsView;
      this.products_view.setElement(this.$el.find('#products'));
    },
    showProductsByPath: function(ev) {
      var a = this.$(ev.currentTarget);
      this.products_view.showProductsByPath(a.attr('path'));
      Backbone.history.navigate(a.attr('href'));
      return false;
    },
    showProductsByPhrase: function(ev) {
      var search = this.$(ev.currentTarget).val().trim();
      if (search.length) {
        this.products_view.showProductsByPhrase(search);
      }
      return false;
    },
    autocomplete: function(ev) {
      var search = this.$(ev.currentTarget).val().trim();
      if (search.length) {
        this.products_view.showProductsByPhrase(search);
      } else {
        this.products_view.showAllProducts();
      }
    }
  });
});

