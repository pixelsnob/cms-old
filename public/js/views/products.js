
define([
  'backbone',
  'collections/products',
  'jade'
],
function(Backbone, ProductsCollection, jade) {
  return Backbone.View.extend({
    //collection_current_path: null,
    collection: new ProductsCollection,
    events: {
      'click .sort_products':    'toggleSort',
      'click .all_products':     'showAllProducts'
    },
    initialize: function() {
      this.collection.fetch({ reset: true });
      this.listenTo(this.collection.filtered, 'reset sort', this.render);
    },
    showAllProducts: function() {
      this.collection.all();
    },
    toggleSort: function() {
      this.collection.filtered.sort_dir =
        (this.collection.filtered.sort_dir == -1 ? 1 : -1);
      this.collection.filtered.sort();
      return false;
    },
    showProductsByPath: function(path) {
      this.collection.filterProductsByPath(path);
      //this.collection_current_path = path;
    },
    showProductsByPhrase: function(phrase) {
      this.collection.filterProductsByPhrase(phrase);
    },
    resetSearch: function() {
      this.collection.filterProductsByPath(this.collection_current_path); 
    },
    render: function() {
      var products = this.collection.filtered.toJSON();
      this.$el.html(jade.render('products_list', { products: products }));
      return this.el;
    }
  });
});

