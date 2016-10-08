var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(data) {
        res.send(JSON.stringify(data));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var data = JSON.parse(req.json);
      models.messages.post(data, function() {
        res.send('new message added');
      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // models.users.get(function(data) {
      //   res.send(JSON.stringify(data));
      // });
    },
    post: function (req, res) {
      var data = JSON.parse(req.json);
      models.users.post(data, function() {
        res.send('new user added');
      });
    }
  }
};

