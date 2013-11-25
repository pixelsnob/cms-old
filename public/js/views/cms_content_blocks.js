
define([
  'backbone',
  'collections/cms_content_blocks',
  'markdown'
], function(Backbone, CmsContentBlocksCollection, markdown) {
  return Backbone.View.extend({
    collection: new CmsContentBlocksCollection,
    events: {
      'click .editable':           'edit',
      'click .editable textarea':  function(ev) { ev.stopPropagation(); },
      'blur .editable textarea':   'save',
      'blur .editable':            'editBlur'
    },
    initialize: function(opts) {
      this.listenTo(this.collection, 'reset', function() {
        this.collection.each(_.bind(function(block) {
          this.$el.find('#' + block.get('_id')).addClass('editable');
            //.attr('title', 'Click to edit...')
        }, this));
      });
    },
    // Make editable
    edit: function(ev) {
      var el    = this.$(ev.currentTarget),
          block = this.collection.get(el.attr('id'));
      if (typeof block == 'undefined') {
        // show error
        return false;
      }
      var editor = $('<textarea>').val(block.get('content'));
      el.empty();
      el.append(editor);
      editor.focus();
    },
    // Save or restore
    save: function(ev) {
      var container   = this.$(ev.currentTarget).parent(),
          block       = this.collection.get(container.attr('id')),
          content     = container.find('textarea').val();
      block.set('content', content);
      if (block.get('type') == 'markdown') {
        content = markdown(content);
      }
      container.empty();
      container.append(content);
    }
  });
});
