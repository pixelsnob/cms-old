
define([
  'backbone',
  'models/cms_page'
  //'views/cms_page'
], function(Backbone, CmsPageModel) {
  return Backbone.View.extend({
    model: new CmsPageModel,
    events: {
      'focus .editable':    'editFocus',
      'blur .editable':     'editBlur'
    },
    initialize: function() {
      this.setElement(this.el);
      this.listenTo(this.model, 'change', function() {
        _.each(this.model.get('content_blocks'), _.bind(function(block) {
          this.$el.find('#' + block._id)
            .addClass('editable')
            .prop('contenteditable', 'true');
        }, this));
      });
      this.model.fetch({ reset: true });
    },
    editFocus: function(ev) {
      var id = this.$(ev.target).attr('id');
      var block = _.findWhere(this.model.get('content_blocks'), { _id: id });
      if (typeof block == 'undefined') {
        // show error
        return false;
      }
      this.$(ev.target).empty();
      this.$(ev.target).append($('<pre>').text(block.content));
    },
    editBlur: function(ev) {
      //console.log('!');
    }
  });
});
