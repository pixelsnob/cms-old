
define([
  'backbone',
  'collections/products',
  'views/product'
],
function(Backbone, ProductsCollection, ProductView, lunr) {
  return Backbone.View.extend({
    collection_current_path: null,
    collection: new ProductsCollection,
    events: {
      'click .sort_products':    'toggleSort',
      'click .all_products':     'showAllProducts'
    },
    initialize: function() {
      this.setElement(this.el);
      this.collection.fetch({ reset: true });
      this.listenTo(this.collection.filtered, 'reset sort',
        _.bind(this.renderList, this, this.collection.filtered));
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
      this.collection_current_path = path;
    },
    showProductsByPhrase: function(phrase) {
      this.collection.filterProductsByPhrase(phrase);
    },
    resetSearch: function() {
      this.collection.filterProductsByPath(this.collection_current_path); 
    },
    renderList: function(collection) {
      collection = (typeof collection == 'undefined' ?
        this.collection : collection);
      var el = this.$el.find('ul.products');
      el.empty();
      collection.each(function(product) {
        var view = new ProductView({ model: product });
        el.append(view.render());
      });
      return el;
    }
  });
});

