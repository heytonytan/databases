var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var initializeDb = function() {
  var dbConnection = mysql.createConnection ({
    user: 'root',
    password: 'fintony',
    database: 'chat'
  });
  
  dbConnection.connect();
  return dbConnection;
};


module.exports._getUserId = function(username, callback) {
  // insert message into database
  // username, messsage, room
  // generate createdAt
  // invoke callback when done
  var dbConnection = initializeDb();
  dbConnection.query('SELECT id from users where username = :username', 
    { username: username },
    function(err, userId) {
      dbConnection.end();
      if (err) { throw err; }
      callback(userId);
    });

};

module.exports.getMessages = function(callback) {
  
  var dbConnection = initializeDb();
  dbConnection.query('SELECT u.username, m.message, m.roomname, m.createdAt FROM messages m INNER JOIN users u ON m.userId = u.id', 
    function(err, data) {
      dbConnection.end();
      if (err) { 
        throw err; 
      } else {
        callback(data);
      }
    });
};

module.exports.postMessage = function(data, callback) {
  // insert message into database
  // username, messsage, room
  // generate createdAt
  // invoke callback when done
  var dbConnection = initializeDb();
  dbConnection.getUserId(data.username, function(userId) {
    dbConnection.query('INSERT INTO messages SET message=:message, roomname=:roomname, userid=:userid', 
      { message: data.message, roomname: data.roomname, userid: userId }, 
      function(err) {
        dbConnection.end();
        if (err) { 
          throw err; 
        } else {
          callback();
        }
      });
  });
};

module.exports.postUser = function(data, callback) {
  // insert user into database
  // username
  // invoke callback when done
  var dbConnection = initializeDb();
  dbConnection.query('INSERT INTO users SET username=:username', 
    { username: data.username }, 
    function(err) {
      dbConnection.end();
      if (err) { 
        throw err; 
      } else {
        callback();
      }
    });
};