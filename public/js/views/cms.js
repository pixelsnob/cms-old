
define([
  'backbone',
  'models/cms_page'
  //'views/cms_page'
], function(Backbone, CmsPageModel) {
  return Backbone.View.extend({
    model: new CmsPageModel,
    events: {
    },
    initialize: function() {
      this.setElement(this.el);
      this.model.fetch();
      console.log('hi');
      //_.each(window.app.page.content, function(block) {
        // assign editable shit here
      //});
    }
  });
});
