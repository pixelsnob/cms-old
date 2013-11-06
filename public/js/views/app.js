
define([
  'backbone',
  'views/products',
  'views/flash_message'
], function(Backbone, ProductsView, MessageView) {
  return Backbone.View.extend({
    el: 'body',
    autocomplete_busy: false,
    autocomplete_iid: null, // setInterval() id
    events: {
      'click nav li.home a':          'showHome',
      'click nav li.product a':       'showProductsByPath',
      'click nav li.all_products a':  'showAllProducts',
      'keyup input[name=search]':     'autocomplete',
      'submit form':                  'showProductsByPhrase'
    },
    initialize: function() {
      this.products_view = new ProductsView({
        el: this.$el.find('#products')
      });
      this.message_view = new MessageView({
        el: this.$el.find('.flash_message')
      });
    },
    showHome: function() {
      Backbone.history.navigate('/');
      return false;
    },
    showAllProducts: function() {
      this.products_view.showAllProducts(); 
      Backbone.history.navigate('/products');
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
      if (!this.autocomplete_busy) {
        this.autocomplete_busy = true;
        this.autocomplete_iid = setInterval(_.bind(function() {
          var search = this.$(ev.currentTarget).val().trim();
          if (search.length) {
            this.products_view.showProductsByPhrase(search);
            Backbone.history.navigate('/products/search/' + search);
          } else {
            this.products_view.showAllProducts();
            Backbone.history.navigate('/products');
          }
          clearInterval(this.autocomplete_iid);
          this.autocomplete_busy = false;
        }, this), 400);
      }
    }
  });
});
