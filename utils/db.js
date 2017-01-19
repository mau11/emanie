var mysql = require('mysql');

// Set up db connection
var connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME || 'localhost',
  user: process.env.RDS_USERNAME || 'root',
  database: process.env.RDS_DB_NAME || 'emanie',
  password: process.env.RDS_PASSWORD || ''/*,
  // comment out the following line during development
  port: process.env.RDS_PORT || 8080*/
});

// Connect to db
connection.connect(function(err){
  if(err){
    console.log('ERROR CONNECTING TO DATABASE: ', err);
    return;
  }
  console.log('SUCCESS, CONNECTED AS ID: ' + connection.threadId);
});

module.exports = {
  connection: connection,
  mysql: mysql
};
