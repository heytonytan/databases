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
  dbConnection.query(`SELECT id from users where username="${username}"`, 
    function(err, data) {
      dbConnection.end();
      if (err) { throw err; }
      if (data.length === 0) {
        module.exports.postUser({ username: username }, function() {
          module.exports._getUserId(username, callback);
        });
      } else {
        var userId = data[0].id;
        callback(userId);
      }
    });

};

module.exports.getMessages = function(callback) {
  
  var dbConnection = initializeDb();
  dbConnection.query('SELECT m.id, u.username, m.message, m.roomname, m.createdAt FROM messages m INNER JOIN users u ON m.userId = u.id', 
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
  this._getUserId(data.username, function(userId) {
    dbConnection.query(`INSERT INTO messages SET message="${data.message}", roomname="${data.roomname}", userid=${userId}`, 
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
  dbConnection.query(`INSERT INTO users SET username="${data.username}"`, 
    function(err) {
      dbConnection.end();
      if (err) { 
        // throw err; 
        console.log('user', data.username, 'already exists');
        callback(err);
      } else {
        callback(null);
      }
    });
};