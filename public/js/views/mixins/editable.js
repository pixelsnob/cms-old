/**
 * Editable fields mixin
 * 
 */
define([
  'modules/vent',
  'modules/dialog'
], function(vent, dialog) {
  return {
    busy: false,
    events: {
      'keydown [contenteditable]': 'editKeydown',
      'click': function() {}
    },
    editKeydown: function(ev) {
      var el = this.$(ev.target),
        name = el.attr('name');
      if (this.busy) {
        return false;
      }
      // Attempt save
      if (ev.keyCode == 13) {
        this.busy = true;
        // Get field from "name" attribute
        var data = {};
        data[name] = el.text();
        var valid = this.model.save(data, {
          // Make sure model doesn't get changed if error
          wait: true,
          success: _.bind(function() {
            this.busy = false;
            el.blur();
            dialog.alert('Instrument saved');
          }, this),
          error: _.bind(function(model, xhr, opts) {
            this.busy = false;
            el.text(this.model.previous(name));
            el.blur();
            dialog.alert('Freaking hell');
          }, this)
        });
        if (valid === false) {
          dialog.alert({
            message: this.model.validationError,
            callback: _.bind(function() {
              this.busy = false;
              el.focus();
            }, this)
          });
        }
        return false;
      }
      // Cancel and restore 
      if (ev.keyCode == 27) {
        el.text(this.model.get(name));
        el.blur();
      }
    }
  };
});
