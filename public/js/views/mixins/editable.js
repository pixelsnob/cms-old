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
    // need to add ability to merge inits
    initialize: function() {
      this.listenTo(this.model, 'invalid', function(model, err) {
        //console.log('?');
        this.busy = false;
        dialog.alert({
          message: err,
          callback: function(value) {
            el.focus();
          }
        });
      });
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
        // Validate on save
        this.model.save(data, {
          wait: true, // <-- Model doesn't get changed on error
          success: _.bind(function() {
            // yay
            this.busy = false;
            el.blur();
            //vent.trigger('message', 'Instrument saved');
            dialog.alert('Instrument saved');
          }, this),
          error: _.bind(function(model, xhr, opts) {
            this.busy = false;
            //vent.trigger('message', 'Freaking hell');
            el.text(this.model.previous(name));
            el.blur();
            dialog.alert('Freaking hell');
          }, this)
        });
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
