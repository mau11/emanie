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
  }
});

// Create patterns table if it does not exist
var newPatternsTable = 'CREATE TABLE IF NOT EXISTS patterns (id int(11) NOT NULL AUTO_INCREMENT, user varchar(20), pattCt varchar(3), pName varchar(20), craft varchar(20), supplies varchar(50), gauge varchar(150), authId varchar(20), notes varchar(200), PRIMARY KEY (id)) ENGINE=InnoDB  DEFAULT CHARSET=utf8';
connection.query(newProfilesTable, function(err, rows){
  if(err){
    throw err;
  }
});

// CRUD ROUTES & SQL:
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
  console.log('ALL---->\n', bod);
  if(bod.pic !== '../img/defaultIcon.png'){
    add1 = (bod.pic);
    sql1 = "UPDATE profiles SET pic = '"+add1+"' WHERE email = '"+req.body.email+"'";
    connection.query(sql1, function(err, rows){
      if(err){
        throw err;
      } else {
        console.log('PIC UPDATED!', add1);
      }
    });
  }
  if(bod.displayName !== null){
    add2 = (bod.displayName);
    sql2 = "UPDATE profiles SET displayName = '"+add2+"' WHERE email = '"+req.body.email+"'";
    connection.query(sql2, function(err, rows){
      if(err){
        throw err;
      } else {
        console.log('DISPLAY NAME UPDATED!', add2);
      }
    });
  }
  if(bod.craftName !== null){
    add3 = (bod.craftName);
    sql3 = "UPDATE profiles SET craftName = '"+add3+"' WHERE email = '"+req.body.email+"'";
    connection.query(sql3, function(err, rows){
      if(err){
        throw err;
      } else {
        console.log('CRAFT NAME UPDATED!', add3);
      }
    });
  }
  if(bod.bio!== null){
    add4 = (bod.bio);
    sql4 = "UPDATE profiles SET bio = '"+add4+"' WHERE email = '"+req.body.email+"'";
    connection.query(sql4, function(err, rows){
      if(err){
        throw err;
      } else {
        console.log('BIO UPDATED!', add4);
      }
    });
  }
  res.send('COMPLETE');
});

// Get single user's profile information
app.get('/update', function (req, res){
  //console.log('UPDATE', res);
  var allUsers = [];
  connection.query("SELECT email, displayName, pic, craftName, pattCt, bio FROM profiles", function(err, rows){
    if(err){
      throw err;
    }
    for(var i = 0; i < rows.length; i++) {
      console.log('SERVER', rows[i]);
      allUsers.push(rows[i]);
    }
    res.send(allUsers);
    console.log('***Data from DB sent!***');
  });
});

app.get('/callback', function(req, res){
  console.log('***USER INFO***', req);
  if(!req.user){
    console.log('***ERROR');
    throw new Error('user null');
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
