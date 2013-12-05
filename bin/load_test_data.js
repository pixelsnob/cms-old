var
  DB_OPTS = {
    server: {
      auto_reconnect: true,
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 10000
      }
    }
  },
  DB_URI          = 'mongodb://localhost/lapr',
  mongoose        = require('mongoose'),
  db              = mongoose.connect(DB_URI, DB_OPTS),
  UserModel       = require('../models/user'),
  PageModel       = require('../models/page'),
  ContentBlockModel = require('../models/content_block');

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
});

db.connection.on('open', function() {

  ContentBlockModel.collection.drop();

  ContentBlockModel.create({
    region: 'main',
    content: "# Top-Level Heading\n\n222222222222\n\nHello there, this is a paragraph. I can't believe this works.\n\n[A link](http://google.com)\n\nThis is a list:\n\n* A list item\n* Another\n* Yet another\n\ntesting\n\nIt's **very** easy to do **bold** and *italics* or\n\nIt's __very__ easy to do __bold__ and _italics_\n\n## A heading\n\nNice, this is rad.\n\n![A caterpillar, actually](/images/user/wormy.jpg \"Neat\")\n\n1. A numbered list\n2. Another item\n3. Cool\n5. ?\n\n## another heading\n\nBlah\n",
    type: 'markdown'
  }, function(err, content_block) {
    if (err) {
      console.log(err);
      return;
    }
    PageModel.collection.drop();
    PageModel.create({
      path: '/test/11',
      title: 'CMS Prototype Test Page',
      keywords: 'blah blah blah',
      description: 'This is a test.',
      content_blocks: [ content_block._id ]
    }, function(err, model) {
      if (err) {
        console.log(err);
        return;
      }
    });
  });

  UserModel.collection.drop();

  UserModel.create({ username: 'luis', password: '1234', name: 'Luis' },
  function(err) {
    if (err) {
      console.log(err);
      return;
    }
  });
  UserModel.create({ username: 'jones', password: '1234', name: 'Jones' },
  function(err) {
    if (err) {
      console.log(err);
      return;
    }
  });
});

