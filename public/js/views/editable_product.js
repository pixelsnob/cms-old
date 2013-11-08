
define([
  'views/product',
  'views/mixins/editable'
], function(ProductView, EditableView) {
  // Mixin editable props and events
  _.defaults(ProductView.prototype, EditableView);
  _.defaults(ProductView.prototype.events, EditableView.events);
  return ProductView;
});
