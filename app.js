var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var path = require('path');
//var fs = require('fs');
var mysql = require('mysql');

var port = 8000;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// create db connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'emanie'
});

// default route for the application
app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// CRUD routes & SQL:
// POST (Create) --> INSERT
// GET (Read) --> SELECT
app.post('/update', function (req, res){
  res.send(allUsers)
});
// PUT (Update) --> UPDATE
// Delete (Delete) --> DELETE


// CONNECT TO DB
connection.connect(function(err){
  if(err){
    console.log('ERROR CONNECTING TO DATABASE', err)
    return;
  }
  console.log('Success, connected as id ' + connection.threadId);
});

// get all data from db
var allUsers = [];
connection.query('SELECT * FROM profiles', function(err, rows){
  if(err){
    throw err;
  }
  console.log('Data received from Db:\n');
  for(var i = 0; i < rows.length; i++) {
    console.log(rows[i]);
    allUsers.push(rows[i]);
  }
});

/*var users = [];
app.get('/updateForm', function(req, res){
  var user = req.body;
  var displayName = user.displayName;
  console.log("Display Name = "+ displayName + ", Craft is "+user.craftName);
  res.end(req.body);
});
*/













// DISCONNECT FROM DB
/*connection.end(function(err){
  if(err){
    console.log('ERROR DISCONNECTING FROM DATABASE');
    return;
  }
  console.log('Database Disconnected');
});*/





/*app.post('/updateForm', function(req, res) {
  console.log('REQ.BODY--->', req.body);
  var user = {displayName: req.body.displayName, craftName: req.body.craftName, bio: req.body.bio};
  connection.query('INSERT INTO profiles SET ?', user, function(err,res){
    if(err) {
      throw err;
    }
    console.log('Last record insert id:', res.insertId);
  });
  res.end();
});*/

/*
  var query = connection.query('INSERT INTO profiles set ?', profiles, function(err, result) {
    if (err) {
      console.error(err);
      return res.send(err);
    } else {
      return res.send('Ok');
    }
  });
  users.push({
    displayName: user.displayName,
    craftName: user.craftName,
    bio: user.bio
  });
  res.send('Success!!');
});*/

/*// insert data
app.post('/updates', function(req, res){
  pool.getConnection(function(error, connect){
    var queryString = "INSERT INTO profiles (displayName, craftName, bio) VALUES('"+req.body.displayName+"','"+req.body.craftName+"','"+req.body.bio+"')";
    connect.query(queryString, function(error, results){
      if(error){
        throw error;
      } else{
        res.send('Insertion Successful');
      }
    });
    conn.release();
  });
  console.log(req.body.displayName);
  console.log(req.body.craftName);
  console.log(req.body.bio);
  //var displayName = req.query.displayName;
});*/


app.listen(port, function(){
  console.log('Listening on port: ' + port);
});
