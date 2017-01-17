var mysql = require('mysql');

// Set up db connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'emanie'
});

// Connect to db
connection.connect(function(err){
  if(err){
    console.log('ERROR CONNECTING TO DATABASE', err);
    return;
  }
  console.log('Success, connected as id ' + connection.threadId);
});

// Create profiles table if it does not exist
var newProfilesTable = 'CREATE TABLE IF NOT EXISTS profiles (id int(11) NOT NULL AUTO_INCREMENT, email varchar(50), displayName varchar(20), pic varchar(50), craftName varchar(20), bio varchar(150), authId varchar(30), pattCt varchar(3), PRIMARY KEY (id)) ENGINE=InnoDB  DEFAULT CHARSET=utf8';
connection.query(newProfilesTable, function(err, rows){
  if(err){
    throw err;
  }
});

module.exports = {
  connection: connection,
  mysql: mysql
};
