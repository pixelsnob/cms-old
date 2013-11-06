
define([
  'backbone',
  'vent'
], function(Backbone, vent) {
  return Backbone.View.extend({
    events: {},
    initialize: function() {
      this.setElement(this.el);
      this.listenTo(vent, 'message', function(model) {
        this.render('Changes saved ' + model);
        console.log(this);
      });
    },
    render: function(msg) {
      this.$el.html(msg).show();
      setTimeout(_.bind(function() {
        this.$el.fadeOut();
      }, this), 5000);
    }
  });
});
