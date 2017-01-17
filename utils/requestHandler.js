var db = require('./db.js');

// Get all users' public information for browsing
exports.getUserPublicInfo = function(req, res){
  db.connection.query("SELECT displayName, pic, craftName, bio, id FROM profiles", function(err, rows){
    if(err){
      throw err;
    }
    res.send(rows);
  });
};
