
define([
  'backbone',
  'collections/cms_content_blocks'
], function(Backbone, CmsContentBlocksCollection) {
  return Backbone.View.extend({
    collection: new CmsContentBlocksCollection,
    events: {
      'focus .editable':  'editFocus',
      'blur .editable':   'editBlur'
    },
    initialize: function(opts) {
      this.listenTo(this.collection, 'reset', function() {
        this.collection.each(_.bind(function(block) {
          this.$el.find('#' + block.get('_id'))
            .addClass('editable')
            .attr('title', 'Click to edit...')
            .prop('contenteditable', 'true');
        }, this));
      });
    },
    // Make editable
    editFocus: function(ev) {
      var el    = this.$(ev.target),
          block = this.collection.get(el.attr('id'));
      if (typeof block == 'undefined') {
        // show error
        return false;
      }
      el.empty();
      el.append($('<pre>').text(block.get('content')));
    },
    // Save or restore
    editBlur: function(ev) {
      var el = this.$(ev.target);
      this.collection.get(el.attr('id')).set('content', el.text());
    }
  });
});
