
define([
  'backbone',
  'models/cms_content_block'
], function(Backbone, CmsContentBlockModel) {
  return Backbone.Collection.extend({
    model: CmsContentBlockModel,
    initialize: function() {
      this.on('change', function() {
        console.log(this);
      });
    }
  });
});
