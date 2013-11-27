/**
 * Content blocks view
 * 
 */
define([
  'backbone',
  'views/cms/content_block'
], function(Backbone, ContentBlockView) {
  return Backbone.View.extend({
    events: {
    },
    views: [],
    initialize: function(opts) {
      this.collection.each(_.bind(function(model) {
        var el = this.$el.find('#' + model.get('_id'));
        this.views.push(new ContentBlockView({ el: el, model: model }));
      }, this));
    },
    revert: function() {
      _.each(this.views, _.bind(function(view) {
        //view.render();
      }, this));
    }
  });
});
