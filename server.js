var express = require('express');
var app = express();

var port = 8000;

app.use(express.static('./public'));
app.get('/', function(req, res){
  /*res.sendFile(__dirname + '/index.html')*/
});

app.listen(port, function(){
  console.log('Listening on port: ' + port);
});
