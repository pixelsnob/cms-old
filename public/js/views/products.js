
define([
  'backbone',
  'collections/products',
  'jade'
],
function(Backbone, ProductsCollection, jade) {
  return Backbone.View.extend({
    collection: new ProductsCollection,
    events: {
      'click .sort_products':    'toggleSort',
      'click .all_products':     'showAllProducts'
    },
    initialize: function() {
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
    },
    showProductsByPhrase: function(phrase) {
      this.collection.filterProductsByPhrase(phrase);
    },
    render: function() {
      var products = this.collection.filtered.toJSON();
      this.$el.html(jade.render('products_list', { filtered_products: products }));
      return this.el;
    }
  });
});

