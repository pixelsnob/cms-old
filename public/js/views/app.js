
define([
  'backbone',
  'views/products'
], function(Backbone, ProductsView) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      'click nav li.home a':          'showHome',
      'click nav li.product a':       'showProductsByPath',
      'click nav li.all_products a':  'showAllProducts',
      'keyup input[name=search]':     'autocomplete',
      'submit form':                  'showProductsByPhrase'
    },
    initialize: function(opts) {
      this.products_view = new ProductsView({ el: this.$el.find('#products') });
    },
    showHome: function() {
      Backbone.history.navigate('/');
      return false;
    },
    showAllProducts: function() {
      this.products_view.showAllProducts(); 
      Backbone.history.navigate('/products/all');
      return false;
    },
    showProductsByPath: function(ev) {
      var path = (typeof ev == 'object' ?
        this.$(ev.currentTarget).attr('path') : ev);
      this.products_view.showProductsByPath(path);
      Backbone.history.navigate('/products/' + path);
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

