var express = require('express');
var app = express();

var port = 8000;

app.get('/', function(req, res){
  res.send('Test!');
});

app.listen(port, function(){
  console.log('Listening on port: ' + port);
});
