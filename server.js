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
var newProfilesTable = 'CREATE TABLE IF NOT EXISTS profiles (id int(11) NOT NULL AUTO_INCREMENT, email varchar(50), displayName varchar(20), pic varchar(50), craftName varchar(20), bio varchar(150), authId varchar(30), pattCt varchar(3), PRIMARY KEY (id)) ENGINE=InnoDB  DEFAULT CHARSET=utf8';
connection.query(newProfilesTable, function(err, rows){
  if(err){
    throw err;
  }
});

// Set default pattern count for each user to 0, only do this once
/*var setDefaultPattCt = "ALTER TABLE profiles ALTER pattCt SET DEFAULT 0";
connection.query(setDefaultPattCt, function(err, rows){
  if(err){
    throw err;
  }
});*/


// Adds new users' email & id to profiles table
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

// Create patterns table if does not exist, adds patterns to patterns table
app.post('/addPatt', function(req, res){
  // Create patterns table for all users
  var newPatternsTable = 'CREATE TABLE IF NOT EXISTS patterns (id int(11) NOT NULL AUTO_INCREMENT, pName varchar(20), craft varchar(20), tools varchar(50), notes varchar(500), email varchar(50), authId varchar(30), PRIMARY KEY (id)) ENGINE=InnoDB  DEFAULT CHARSET=utf8';
  connection.query(newPatternsTable, function(err, rows){
    if(err){
      throw err;
    }
  });
  if(req.body.length === 6){
    var addInitialInfo = "INSERT IGNORE INTO patterns (email, authId, pName, craft, tools, notes) VALUES ('"+req.body[0]+"'"+","+"'"+req.body[1]+"'"+","+"'"+req.body[2]+"'"+","+"'"+req.body[3]+"'"+","+"'"+req.body[4]+"'"+","+"'"+req.body[5]+"')";
    connection.query(addInitialInfo, function(err, rows){
      if(err){
        throw err;
      }
      console.log(req.body);
    });
    // Increase user's pattern count by one
  }
  res.send('Complete');
});


// Get user's profile information
app.get('/update', function (req, res){
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

// Get all users' info for browsing
app.get('/browse', function(req, res){
  connection.query("SELECT displayName, pic, craftName, bio FROM profiles", function(err, rows){
    if(err){
      throw err;
    }
    res.send(rows);
  })
});

// Get all patterns from table
app.get('/viewPatt', function(req, res){
  var views = "SELECT * FROM patterns";
  connection.query(views, function(err, rows){
    if(err){
      throw err;
    }
    res.send(rows);
  })
});

// Get all patterns sorted A-Z
app.get('/sortPatt', function(req, res){
  var sorted = "SELECT * FROM patterns ORDER BY pName";
  connection.query(sorted, function(err, rows){
    if(err){
      throw err;
    }
    console.log(rows);
    res.send(rows);
  })
});

// Get all patterns sorted A-Z
app.get('/sortCraft', function(req, res){
  var sorted = "SELECT * FROM patterns ORDER BY craft, pName";
  connection.query(sorted, function(err, rows){
    if(err){
      throw err;
    }
    console.log(rows);
    res.send(rows);
  })
});



// Update user's info in DB based on client input
app.put('/update', function(req, res){
  console.log('FROM CLIENT INPUT', req.body);
  var add1, add2, add3, add4;
  var sql1, sql2, sql3, sql4;
  var bod = req.body;
  console.log('ALL---->\n', bod);
  if(bod.pic !== null){
    add1 = (bod.pic);
    sql1 = "UPDATE profiles SET pic = '"+add1+"' WHERE email = '"+req.body.email+"'";
    connection.query(sql1, function(err, rows){
      if(err){
        throw err;
      }
    });
  }
  if(bod.displayName !== null){
    add2 = (bod.displayName);
    sql2 = "UPDATE profiles SET displayName = '"+add2+"' WHERE email = '"+req.body.email+"'";
    connection.query(sql2, function(err, rows){
      if(err){
        throw err;
      }
    });
  }
  if(bod.craftName !== null){
    add3 = (bod.craftName);
    sql3 = "UPDATE profiles SET craftName = '"+add3+"' WHERE email = '"+req.body.email+"'";
    connection.query(sql3, function(err, rows){
      if(err){
        throw err;
      }
    });
  }
  if(bod.bio!== null){
    add4 = (bod.bio);
    sql4 = "UPDATE profiles SET bio = '"+add4+"' WHERE email = '"+req.body.email+"'";
    connection.query(sql4, function(err, rows){
      if(err){
        throw err;
      }
    });
  }
  res.send('COMPLETE');
});

// Delete a pattern from pattern's table
app.delete('/removePatt', function(req, res){
  var removal = "DELETE FROM patterns WHERE email = (), pName =(), notes =()LIMIT 1";
  connection.query(removal, function(err, row){
    if(err){
      throw err;
    }
  });
  res.send(row) // returns number of deleted rows
});

app.listen(port, function(){
  console.log('Listening on port: ' + port);
});
