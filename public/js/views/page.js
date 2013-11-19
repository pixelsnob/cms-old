
define([
  'models/page'
], function(PageModel) {
  return Backbone.View.extend({
    model: new PageModel,
    events: {
    },
    initialize: function() {
      this.setElement(this.el); 
      this.model.fetch();
      this.model.save();
    }
  });
});
