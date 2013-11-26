
define([
  'backbone',
  'markdown'
], function(Backbone, markdown) {
  return Backbone.View.extend({
    events: {
    },
    initialize: function() {
      this.setElement(this.el);
    },
    render: function() {
      var content = this.$el.find('textarea').val();
      this.model.set('content', content);
      if (this.model.get('type') == 'markdown') {
        content = markdown(content);
      }
      this.$el.empty();
      this.$el.append(content);
      return this;
    }
  });
});
