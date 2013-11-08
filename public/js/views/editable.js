/**
 * Editable fields mixin
 * 
 */
define([
  'modules/vent',
], function(vent) {
  return {
    events: {
      'keydown [contenteditable]': 'editKeydown',
      'click': function() {}
    },
    editKeydown: function(ev) {
      var el = this.$(ev.target);
      if (this.busy) {
        return false;
      }
      // Attempt save
      if (ev.keyCode == 13) {
        this.busy = true;
        // Get field from "name" attribute
        var data = {};
        data[el.attr('name')] = el.text();
        this.model.save(data, {
          wait: true, // <-- Model doesn't get changed on error
          success: _.bind(function() {
            // yay
            this.busy = false;
            el.blur();
            vent.trigger('message', 'Instrument saved');
          }, this),
          error: _.bind(function(model, xhr, opts) {
            this.busy = false;
            el.blur();
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
    }
  };
});
