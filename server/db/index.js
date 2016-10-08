var Sequelize = require('sequelize');
var users = require('./users');
var messages = require('./messages');

var initializeDb = function() {
  var db = new Sequelize('chat', 'root', 'fintony');
  return db;
};

module.exports._getUserId = function(username, callback) {
  

  // // insert message into database
  // // username, messsage, room
  // // generate createdAt
  // // invoke callback when done
  // var dbConnection = initializeDb();
  // dbConnection.query(`SELECT id from users where username="${username}"`, 
  //   function(err, data) {
  //     dbConnection.end();
  //     if (err) { throw err; }
  //     if (data.length === 0) {
  //       module.exports.postUser({ username: username }, function() {
  //         module.exports._getUserId(username, callback);
  //       });
  //     } else {
  //       var userId = data[0].id;
  //       callback(userId);
  //     }
  //   });

  var dbConnection = initializeDb();
  var Users = users(dbConnection, Sequelize);  
  Users.sync()
  .then(function() {
    return Users.findAll({ where: { username: username }});
  }).then((data) => {
    console.log('getUserId data', data);
    dbConnection.close();
    if (data.length === 0) {
      module.exports.postUser({ username: username }, function() {
        // module.exports._getUserId(username, callback);
      });
    } else {
      callback(data[0].id);
    }
  })
  .catch(function(error) {
    console.error(error);
    dbConnection.close();
  });
};

module.exports.getMessages = function(callback) {
  
  var dbConnection = initializeDb();
  var Users = users(dbConnection, Sequelize);
  var Messages = messages(dbConnection, Sequelize);

  Users.hasMany(Messages, {foreignKey: 'id'});
  Messages.belongsTo(Users, {foreignKey: 'id'});

  Messages.sync()
  .then(function() {
    return Messages.findAll();
  })
  .then((data) => {
    dbConnection.close();
    callback(data);
  })
  .catch(function(error) {
    console.error(error);
    dbConnection.close();
  });
  // dbConnection.query('SELECT m.id, u.username, m.message, m.roomname, m.createdAt FROM messages m INNER JOIN users u ON m.userId = u.id', 
  //   function(err, data) {
  //     dbConnection.end();
  //     if (err) { 
  //       throw err; 
  //     } else {
  //       callback(data);
  //     }
  //   });
};

module.exports.postMessage = function(data, callback) {
  // insert message into database
  // username, messsage, room
  // generate createdAt
  // invoke callback when done
  console.log('postMessage', data); 
  var dbConnection = initializeDb();
  var Messages = messages(dbConnection, Sequelize);

  this._getUserId(data.username, function(userId) {
    Messages.sync()
    .then(function() {
      return Messages.create({ message: data.message, roomname: data.roomname, userid: userId});
    })
    .then(function() {
      dbConnection.close();
      callback();
    })
    .catch(function(error) {
      console.error(error);
      dbConnection.close();
    });
    // dbConnection.query(`INSERT INTO messages SET message="${data.message}", roomname="${data.roomname}", userid=${userId}`, 
    //   function(err) {
    //     dbConnection.end();
    //     if (err) { 
    //       throw err; 
    //     } else {
    //       callback();
    //     }
    //   });
  });
};

module.exports.postUser = function(data, callback) {
  // insert user into database
  // username
  // invoke callback when done
  var dbConnection = initializeDb();
  var Users = users(dbConnection, Sequelize);

  Users.sync()
  .then(function() {
    return Users.create({ username: data.username });
  })
  .then(function() {
    dbConnection.close();
    callback(null);
  })
  .catch(function(error) {
    console.error(error);
    dbConnection.close();
    callback(error);
  });

  // dbConnection.query(`INSERT INTO users SET username="${data.username}"`, 
  //   function(err) {
  //     dbConnection.end();
  //     if (err) { 
  //       // throw err; 
  //       console.log('user', data.username, 'already exists');
  //       callback(err);
  //     } else {
  //       callback(null);
  //     }
  //   });
};