var Sequelize = require('sequelize');
var users = require('./users');
var messages = require('./messages');

var initializeDb = function() {
  var db = new Sequelize('chat', 'root', 'fintony');
  return db;
};

module.exports._getUserId = function(username, callback) {
  
  var dbConnection = initializeDb();
  var Users = users(dbConnection, Sequelize);  
  // Users.sync();

  dbConnection.query(`SELECT id FROM users WHERE username="${username}"`)
  .then((data) => {
    data = JSON.parse(JSON.stringify(data))[0];
    if (data.length === 0) {
      module.exports.postUser({ username: username }, function() {
        module.exports._getUserId(username, callback);
      });
    } else {
      callback(data[0].id);
    }
  })
  .then(() => dbConnection.close())
  .catch(function(error) {
    console.error(error);
    dbConnection.close();
  });
};

module.exports.getMessages = function(callback) {
  
  var dbConnection = initializeDb();
  var Users = users(dbConnection, Sequelize);
  var Messages = messages(dbConnection, Sequelize);
  // Users.sync();
  // Messages.sync();

  dbConnection.query('SELECT m.id, u.username, m.message, m.roomname, m.createdAt FROM messages m INNER JOIN users u ON m.userId = u.id')
  .then(function(data) {
    callback(data[0]);
    dbConnection.close();
  })
  .catch(function(error) {
    console.error(error);
    dbConnection.close();
  });
};

module.exports.postMessage = function(data, callback) {

  var dbConnection = initializeDb();
  var Messages = messages(dbConnection, Sequelize);
  // Messages.sync();

  this._getUserId(data.username, function(userId) {
    dbConnection.query(`INSERT messages SET message="${data.message}", roomname="${data.roomname}", userid=${userId}`)
    .then(function() {
      callback();
    })
    .then(() => dbConnection.close())
    .catch(function(error) {
      console.error(error);
    });
  });
};

module.exports.postUser = function(data, callback) {

  var dbConnection = initializeDb();
  var Users = users(dbConnection, Sequelize);
  // Users.sync();

  dbConnection.query(`INSERT INTO users SET username="${data.username}"`)
  .then(function() {
    callback(null);
  })
  .then(() => dbConnection.close())
  .catch(function(error) {
    callback(error);
  });

};