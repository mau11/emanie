var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var multer = require('multer');
var handler = require('./utils/requestHandler.js');
var port = process.env.RDS_PORT || 8080;

// Middleware
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Default express route for app
app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Pattern upload using multer
var storage =   multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.pdf');
  }
});

var upload = multer({ storage : storage }).array('userFile', 2);

app.get('/image/:id',function(req,res){
  console.log(req.params);
  res.sendFile(__dirname + "/index.html");
});

app.post('/api/patterns/upload', function(req,res){
  upload(req,res,function(err) {
    console.log(req.body);
    console.log(req.files);
    if(err) {
      return res.end("Error uploading file.");
    }
      res.end("File is uploaded");
    });
});

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~ PROFILES ~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Adds new users' email & unique auth0 id to profiles table
app.post('/api/users/add', handler.addNewUser);

// Get all users' public information for browsing
app.get('/api/users', handler.getUserPublicInfo);

// Get user's profile information
app.get('/api/users/all', handler.getAllUserInfo);

// Update user's info in DB based on client input
app.put('/api/user/update', handler.updateProfile);

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~ PATTERNS ~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Adds patterns to patterns table
app.post('/api/patterns/new', handler.addNewPattern);

// Get all patterns from table
app.get('/api/patterns', handler.getAllPatterns);

// Get all patterns sorted pattern name
app.get('/api/patterns/sorted/name', handler.sortPatternsByName);

// Get all patterns sorted by craft
app.get('/api/patterns/sorted/craft', handler.sortPatternsByCraft);

app.get('/api/patterns/:searching', handler.searchPatterns);

// Delete a pattern
app.delete('/api/patterns/:deletePatt', handler.deletePattern);

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~ YARN ~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Adds yarn to yarn table
app.post('/api/yarn/add', handler.addNewYarn);

// Get yarn from table
app.get('/api/yarn', handler.getYarn);

// Delete yarn
app.delete('/api/yarn/:deleteYarn', handler.deletingYarn);

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~ TOOLS ~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Adds hooks/needles to tools table
app.post('/api/tools/add', handler.addNewTool);

// Get tools from table
app.get('/api/tools', handler.getTools);

// Delete tool
app.delete('/api/tools/:deleteTool', handler.deletingTool);

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~ WEEKLY UPDATES ~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
app.get('/api/updates', handler.getWeeklyUpdates);


app.listen(port, function(){
  console.log('Listening on port: ' + port);
});
