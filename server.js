var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var mysql = require('mysql');
var port = 8000;

// Middleware
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Default express route for app
app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

// Create profiles table if it does not exist
var newProfilesTable = 'CREATE TABLE IF NOT EXISTS profiles (id int(11) NOT NULL AUTO_INCREMENT, email varchar(50) UNIQUE, displayName varchar(20), pic varchar(50), craftName varchar(20), pattCt varchar(3), bio varchar(150), authId varchar(30) UNIQUE, PRIMARY KEY (id)) ENGINE=InnoDB  DEFAULT CHARSET=utf8';
connection.query(newProfilesTable, function(err, rows){
  if(err){
    throw err;
  }/*else {
    // Add some test data to table (optional)
    var addTestData = "INSERT IGNORE INTO profiles (displayName, craftName, bio) VALUES ('Mau', 'knit/crochet', 'Welcome to my site! I am a long time designer and crafter with a love of computer programming, travel and world languages'), ('Tester', 'testing', 'I am just a test')";
    connection.query(addTestData, function(error, rows){
      if(error){
        throw error;
      }
    });
  }*/
});

// Create patterns table if it does not exist
var newPatternsTable = 'CREATE TABLE IF NOT EXISTS patterns (id int(11) NOT NULL AUTO_INCREMENT, user varchar(20), pattCt varchar(3), pName varchar(20), craft varchar(20), supplies varchar(50), gauge varchar(150), authId varchar(20), notes varchar(200), PRIMARY KEY (id)) ENGINE=InnoDB  DEFAULT CHARSET=utf8';
connection.query(newProfilesTable, function(err, rows){
  if(err){
    throw err;
  }
});

// CRUD ROUTES & SQL:
// POST (Create) --> INSERT
// Adds only new users' email & id to profiles table
app.post('/addNew', function(req, res){
  console.log('FROM CLIENT ADD NEW', req.body);
  if(req.body.length === 2){
    var addInitialInfo = "INSERT IGNORE INTO profiles (email, authId) VALUES ('"+req.body[0]+"'"+","+"'"+req.body[1]+"')";
   connection.query(addInitialInfo, function(err, rows){
    if(err){
      throw err;
    }
    console.log(req.body);
   });
  }
});

// Update user's info in DB
app.post('/update', function(req, res){
  console.log('FROM CLIENT INPUT', req.body);
  var add1, add2, add3, add4;
  var sql1, sql2, sql3, sql4;
  var bod = req.body;
  for(var i = 0; i < bod.length; i++){
    for(var key in bod){
      console.log('ALL---->\n', bod);
      if(bod[i]['pic'] !== '../img/defaultIcon.png'){
        add1 = (bod[i]['pic']);
        sql1 = mysql.format("UPDATE profiles SET pic = ? WHERE authId = '"+req.body[0].authId+"'", add1);
        connection.query(sql1, function(err, rows){
          if(err){
            throw err;
          }
          res.send('PIC UPDATED!');
        })
      };
      if(bod[i]['displayName'] !== null){
        add2 = (bod[i]['displayName']);
        sql2 = mysql.format("UPDATE profiles SET displayName = ? WHERE authId = '"+req.body[0].authId+"'", add2);
        connection.query(sql2, function(err, rows){
          if(err){
            throw err;
          }
          res.send('DISPLAY NAME UPDATED!');
        })
      };
      if(bod[i]['craftName'] !== null){
        add3 = (bod[i]['craftName']);
        sql3 = mysql.format("UPDATE profiles SET craftName = ? WHERE authId = '"+req.body[0].authId+"'", add3);
        connection.query(sql3, function(err, rows){
          if(err){
            throw err;
          }
          res.send('CRAFT NAME UPDATED!');
        })
      };
      if(bod[i]['bio'] !== null){
        add4 = (bod[i]['bio']);
        sql4 = mysql.format("UPDATE profiles SET bio = ? WHERE authId = '"+req.body[0].authId+"'", add4);
        connection.query(sql4, function(err, rows){
          if(err){
            throw err;
          }
          res.send('BIO UPDATED!');
        })
      };
    }
  }
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

app.get('/callback', function(req, res){
  console.log('***USER INFO***', req);
  if(!req.user){
    throw new Error('user null');
    console.log('***ERROR');
  }
  res.redirect('/');
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
