var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.getMessages(callback);
    }, // a function which produces all the messages
    post: function (data, callback) {
      db.postMessage(data, callback);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (data, callback) {
      db.postUser(data, callback);
    }
  }
};

