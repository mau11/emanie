var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var mysql = require('mysql');
var port = 8000;

// middleware
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up db connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'emanie'
});

// Connect to db
connection.connect(function(err){
  if(err){
    console.log('ERROR CONNECTING TO DATABASE', err)
    return;
  }
  console.log('Success, connected as id ' + connection.threadId);
});

// Default express route for app
app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create new tables if they do not exist
var newTable = 'CREATE TABLE IF NOT EXISTS profiles (id int(11) NOT NULL AUTO_INCREMENT, name varchar(20), displayName varchar(20) UNIQUE, craftName varchar(20), bio varchar(150), PRIMARY KEY (id)) ENGINE=InnoDB  DEFAULT CHARSET=utf8';
connection.query(newTable, function(err, rows){
  if(err){
    throw err;
  } else {
    // add some test data to table (optional)
    var addTestData = "INSERT IGNORE INTO profiles (displayName, craftName, bio) VALUES ('Mau', 'knit/crochet', 'Welcome to my site! I am a long time designer and crafter with a love of computer programming, travel and world languages'), ('Tester', 'testing', 'I am just a test')";
    connection.query(addTestData, function(error, rows){
      if(error){
        throw error;
      }
    });
  }
});




// CRUD ROUTES & SQL:
// POST (Create) --> INSERT
app.post('/update', function(req, res){
  console.log('TEST', req.body);
  var addTo = [];
  req.forEach(function(val){
    addTo.push(req[val]);
  });
  var sql3 = mysql.format("UPDATE profiles SET displayName = ? WHERE id = 1", addTo);
  connection.query(sql3, function(err, rows){
    console.log('QUERIES:', req.body.displayName);
    if(err){
      throw err;
    }
    res.send('Update, Complete');
  });
});


// GET (Read) --> SELECT
app.get('/update', function (req, res){
  var allUsers = [];
  connection.query('SELECT * FROM profiles', function(err, rows){
    if(err){
      throw err;
    }
    for(var i = 0; i < rows.length; i++) {
      //console.log('SERVER', rows[i]);
      allUsers.push(rows[i]);
    }
    res.send(allUsers);
    console.log('***Data from DB sent!***');
  });
});


// PUT (Update) --> UPDATE
/*app.put('/update/', function (req, res){
  var edited = [];
  var editUser = "UPDATE profiles SET displayName = ? WHERE id = 2";
  var inputs = [req.body.displayName];
  var sql2 = mysql.format(editUser, inputs);
  //res.send(req);
  connection.query(sql2, function(err, rows){
    if(err){
      throw err;
    }
    for(var j = 0; j < rows.length; j++) {
      console.log(rows[j]);
      edited.push(rows[j]);
    }
  res.send(edited)
  })
});*/

// DELETE (Delete) --> DELETE


app.listen(port, function(){
  console.log('Listening on port: ' + port);
});
