
define([
  'views/product',
  'views/editable'
], function(ProductView, EditableView) {
  // Mixin editable props and events
  _.defaults(ProductView.prototype, EditableView);
  _.defaults(ProductView.prototype.events, EditableView.events);
  return ProductView;
});
