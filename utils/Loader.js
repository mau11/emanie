var mysql = require('mysql');

/*var executeQuery = function(query, callback){*/
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'emanie'
});
/*};*/

module.exports = connection;
