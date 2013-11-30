/**
 * View helpers
 * 
 */
var _        = require('underscore'),
    jade     = require('jade'),
    markdown = require('marked');

module.exports = function(app) {
  return {
    renderPageContent: function(content_blocks, region) {
      var content_block = _.findWhere(content_blocks, { region: region });
      if (content_block) {
        return jade.renderFile(
          'views/cms_content_block.jade',
          { content_block: content_block, markdown: markdown }
        );
      }
    }
  };
};
