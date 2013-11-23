
define([
  'backbone',
  'models/cms_page'
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
        this.model.content_blocks.each(_.bind(function(block) {
          this.$el.find('#' + block.get('_id'))
            .addClass('editable')
            .attr('title', 'Click to edit...')
            .prop('contenteditable', 'true');
        }, this));
      });
      this.model.fetch();
    },
    // Make editable
    editFocus: function(ev) {
      var id = this.$(ev.target).attr('id');
      var block = this.model.content_blocks.get(id);
      if (typeof block == 'undefined') {
        // show error
        return false;
      }
      this.$(ev.target).empty();
      this.$(ev.target).append($('<pre>').text(block.get('content')));
    },
    // Save
    editBlur: function(ev) {
      var id    = this.$(ev.target).attr('id'),
        content = this.$(ev.target).text();
      this.model.content_blocks.get(id).set('content', this.$(ev.target).text());
      //this.model.content_blocks.get(id).save();
    }
  });
});
