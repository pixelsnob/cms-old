
define([
  'backbone',
  'views/products'
], function(Backbone, ProductsView) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      'click nav li.product a':  'showProductsByPath',
      'submit form':             'showProductsByPhrase',
      'click .reset_products':   'resetProducts'
    },
    initialize: function(opts) {
      this.products_view = new ProductsView;
      this.$el.find('#content').html(this.products_view.render());
      this.products_view.showAllProducts();
    },
    showProductsByPath: function(ev) {
      var a = this.$(ev.currentTarget);
      this.products_view.showProductsByPath(a.attr('path'));
      Backbone.history.navigate(a.attr('href'));
      return false;
    },
    showProductsByPhrase: function(ev) {
      var search = this.$el.find('input[name=search]').val().trim();
      if (search.length) {
        this.products_view.showProductsByPhrase(search);
      }
      return false;
    },
    resetProducts: function(ev) {
      this.products_view.resetSearch();
      this.$el.find('input[name=search]').val('');
      return false;
    }
  });
});

