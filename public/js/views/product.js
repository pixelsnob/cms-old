
define([
  'backbone',
  'models/product',
  'jade',
  'modules/vent',
  'modules/dialog'
], function(Backbone, ProductModel, jade, vent, dialog) {
  return Backbone.View.extend({
    tagName: 'li',
    model: ProductModel,
    busy: false,
    events: {
      'keydown [contenteditable]': 'editKeydown'
    },
    initialize: function(opts) {
      this.setElement(jade.render('product', { product: this.model.toJSON() }));
    },
    editKeydown: function(ev) {
      var el = this.$(ev.target);
      if (this.busy) {
        return false;
      }
      // Attempt save
      if (ev.keyCode == 13) {
        this.busy = true;
        this.model.save({ description: el.text() }, {
          wait: true, // <-- Model doesn't get changed on error
          success: _.bind(function() {
            // yay
            this.busy = false;
            el.blur();
            vent.trigger('message', 'Instrument saved');
            dialog.alert({
              message: 'nice',
              callback: function(val) {
                console.log('cool');
              }
            });
          }, this),
          error: _.bind(function(model, xhr, opts) {
            this.busy = false;
            vent.trigger('message', 'Freaking hell');
          }, this)
        });
        return false;
      }
      // Cancel and restore 
      if (ev.keyCode == 27) {
        el.text(this.model.get('description'));
        el.blur();
      }
    },
    render: function() {
      return this.el;
    }
  });
});
