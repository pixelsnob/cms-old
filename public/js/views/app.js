
define([
  'backbone',
  'views/products'
], function(Backbone, ProductsView) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      'click nav li.product a':       'showProductsByPath',
      'click nav li.all_products a':  'showAllProducts',
      'keyup input[name=search]':     'autocomplete',
      'submit form':                  'showProductsByPhrase'
    },
    initialize: function(opts) {
      this.products_view = new ProductsView;
      var products_el = this.$el.find('#products');
      if (products_el.length) {
        this.products_view.setElement(products_el);
      } else {
        this.$el.find('#content').append(this.products_view.render());
      }
    },
    showAllProducts: function() {
      this.products_view.showAllProducts(); 
      return false;
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

