
/**
 * Products view
 * 
 */
define([
  'backbone',
  'collections/products',
  'jade'
],
function(Backbone, ProductsCollection, jade) {
  return Backbone.View.extend({
    collection: new ProductsCollection,
    events: {
      'click .sort_products':    'toggleSort'
    },
    initialize: function(opts) {
      this.setElement(this.el);
      this.listenTo(this.collection.filtered, 'reset sort', this.render);
      this.collection.fetch({ reset: true });
    },
    showAllProducts: function() {
      this.collection.all();
    },
    showProductsByPath: function(path) {
      this.collection.filterProductsByPath(path);
    },
    showProductsByPhrase: function(phrase) {
      this.collection.filterProductsByPhrase(phrase);
    },
    toggleSort: function() {
      this.collection.filtered.sort_dir =
        (this.collection.filtered.sort_dir == -1 ? 1 : -1);
      this.collection.filtered.sort();
      return false;
    },
    render: function() {
      this.$el.html(jade.render('products_list', {
        filtered_products: this.collection.filtered.toJSON() }));
      return this.el;
    }
  });
});

