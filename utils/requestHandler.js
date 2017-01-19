var db = require('./db.js');

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~ PROFILES ~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Adds new users' email & unique auth0 id to profiles table
exports.addNewUser = function(req, res){
  console.log('FROM CLIENT ADD NEW', req.body);
  if(req.body.length === 2){
    var addInitialInfo = "INSERT IGNORE INTO profiles (email, authId) VALUES ('"+req.body[0]+"'"+","+"'"+req.body[1]+"')";
    db.connection.query(addInitialInfo, function(err, rows){
      if(err){
        throw err;
      }
      console.log(req.body);
    });
  }
};

// Get all users' public information for browsing
exports.getUserPublicInfo = function(req, res){
  db.connection.query("SELECT displayName, pic, craftName, bio, id FROM profiles", function(err, rows){
    if(err){
      throw err;
    }
    res.send(rows);
  });
};

// Get user's profile information
exports.getAllUserInfo = function (req, res){
  var allUsers = [];
  db.connection.query("SELECT email, displayName, pic, craftName, pattCt, bio FROM profiles", function(err, rows){
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
}

// Update user's info in DB based on client input
exports.updateProfile = function(req, res){
  console.log('FROM CLIENT INPUT', req.body);
  var add1, add2, add3, add4;
  var sql1, sql2, sql3, sql4;
  var bod = req.body;
  console.log('ALL---->\n', bod);
  if(bod.pic !== null){
    add1 = (bod.pic);
    sql1 = "UPDATE profiles SET pic = '"+add1+"' WHERE email = '"+req.body.email+"'";
    db.connection.query(sql1, function(err, rows){
      if(err){
        throw err;
      }
    });
  }
  if(bod.displayName !== null){
    add2 = (bod.displayName);
    sql2 = "UPDATE profiles SET displayName = '"+add2+"' WHERE email = '"+req.body.email+"'";
    db.connection.query(sql2, function(err, rows){
      if(err){
        throw err;
      }
    });
  }
  if(bod.craftName !== null){
    add3 = (bod.craftName);
    sql3 = "UPDATE profiles SET craftName = '"+add3+"' WHERE email = '"+req.body.email+"'";
    db.connection.query(sql3, function(err, rows){
      if(err){
        throw err;
      }
    });
  }
  if(bod.bio!== null){
    add4 = (bod.bio);
    sql4 = "UPDATE profiles SET bio = '"+add4+"' WHERE email = '"+req.body.email+"'";
    db.connection.query(sql4, function(err, rows){
      if(err){
        throw err;
      }
    });
  }
  res.send('COMPLETE');
};

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~ PATTERNS ~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Adds patterns to patterns table
exports.addNewPattern = function(req, res){
  if(req.body.length === 6){
    var addInitialInfo = "INSERT IGNORE INTO patterns (email, authId, pName, craft, tools, notes) VALUES ('"+req.body[0]+"'"+","+"'"+req.body[1]+"'"+","+"'"+req.body[2]+"'"+","+"'"+req.body[3]+"'"+","+"'"+req.body[4]+"'"+","+"'"+req.body[5]+"')";
    db.connection.query(addInitialInfo, function(err, rows){
      if(err){
        throw err;
      }
      console.log(req.body);
    });
  }
  res.send('Complete');
};

// Get all patterns from table
exports.getAllPatterns = function(req, res){
  var views = "SELECT * FROM patterns";
  db.connection.query(views, function(err, rows){
    if(err){
      throw err;
    }
    res.send(rows);
  });
};

// Get all patterns sorted pattern name
exports.sortPatternsByName = function(req, res){
  var sorted = "SELECT * FROM patterns ORDER BY pName";
  db.connection.query(sorted, function(err, rows){
    if(err){
      throw err;
    }
    console.log(rows);
    res.send(rows);
  });
}

// Get all patterns sorted by craft
exports.sortPatternsByCraft = function(req, res){
  var sorted = "SELECT * FROM patterns ORDER BY craft, pName";
  db.connection.query(sorted, function(err, rows){
    if(err){
      throw err;
    }
    console.log(rows);
    res.send(rows);
  });
};

// Delete a pattern
exports.deletePattern = function(req, res){
  var item = req.params.deletePatt;
  var item = item.substr(1);
  var item = Number(item);
  console.log('PARAMS', item);
  var removal = "DELETE FROM patterns WHERE id = "+item+"";
  db.connection.query(removal, function(err, row){
    if(err){
      throw err;
    }
  });
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~ YARN ~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

exports.addNewYarn = function(req, res){
  if(req.body.length === 7){
    var adding = "INSERT IGNORE INTO yarn (email, authId, color, weight, brand, amount, notes) VALUES ('"+req.body[0]+"'"+","+"'"+req.body[1]+"'"+","+"'"+req.body[2]+"'"+","+"'"+req.body[3]+"'"+","+"'"+req.body[4]+"'"+","+"'"+req.body[5]+"'"+","+"'"+req.body[6]+"')";
    db.connection.query(adding, function(err, rows){
      if(err){
        throw err;
      }
      console.log(req.body);
    });
  }
  res.send('Complete');
};

exports.getYarn = function(req, res){
  var allYarn = "SELECT * FROM yarn";
  db.connection.query(allYarn, function(err, rows){
    if(err){
      throw err;
    }
    res.send(rows);
  });
}

exports.deletingYarn = function(req, res){
  var skein = req.params.deleteYarn;
  skein = skein.substr(1);
  skein = Number(skein);
  console.log('PARAMS', skein);
  var remove = "DELETE FROM yarn WHERE id = "+skein+"";
  db.connection.query(remove, function(err, row){
    if(err){
      throw err;
    }
  });
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~ TOOLS ~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

exports.addNewTool = function(req, res){
  if(req.body.length === 7){
    var addingTool = "INSERT IGNORE INTO tools (email, authId, craft, tool, size, material, notes) VALUES ('"+req.body[0]+"'"+","+"'"+req.body[1]+"'"+","+"'"+req.body[2]+"'"+","+"'"+req.body[3]+"'"+","+"'"+req.body[4]+"'"+","+"'"+req.body[5]+"'"+","+"'"+req.body[6]+"')";
    db.connection.query(addingTool, function(err, rows){
      if(err){
        throw err;
      }
      console.log(req.body);
    });
  }
  res.send('Complete');
};

exports.getTools = function(req, res){
  var allTools = "SELECT * FROM tools";
  db.connection.query(allTools, function(err, rows){
    if(err){
      throw err;
    }
    res.send(rows);
  });
}

exports.deletingTool = function(req, res){
  var tool = req.params.deleteTool;
  tool = tool.substr(1);
  tool = Number(tool);
  console.log('PARAMS', tool);
  var remove = "DELETE FROM tools WHERE id = "+tool+"";
  db.connection.query(remove, function(err, row){
    if(err){
      throw err;
    }
  });
}


/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~ WEEKLY UPDATES ~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

exports.getWeeklyUpdates = function(req, res){
  var updated = "SELECT DATE_FORMAT(date, '%b-%d-%Y'), notes, id FROM updates ORDER BY date DESC";
  db.connection.query(updated, function(err, rows){
    if(err){
      throw err;
    }
    console.log(rows);
    res.send(rows);
  });
}
