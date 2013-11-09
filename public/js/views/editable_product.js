
define([
  'views/product',
  'views/mixins/editable'
], function(ProductView, EditableView) {
  // Mixin editable props and events
  Backbone.View.mixin(ProductView, EditableView);
  return ProductView;
});
