
define([
  'backbone',
  'collections/products',
  'views/product'
],
function(Backbone, ProductsCollection, ProductView, lunr) {
  return Backbone.View.extend({
    collection: new ProductsCollection,
    events: {
      'click #sort': 'toggleSort'
    },
    initialize: function() {
      this.setElement(this.el);
      this.collection.fetch();
      this.listenTo(this.collection.filtered, 'reset sort',
        _.bind(this.renderList, this, this.collection.filtered));
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
      //console.log(this.index.search(phrase));
    },
    renderList: function(collection) {
      collection = (typeof collection == 'undefined' ?
        this.collection : collection);
      var el = this.$el.find('ul');
      el.empty();
      collection.forEach(function(product) {
        var view = new ProductView({ model: product });
        el.append(view.render());
      });
      return el;
    }
  });
});

