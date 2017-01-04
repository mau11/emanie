

connection.end(function(err){
  if(err){
    console.log('ERROR DISCONNECTING FROM DATABASE');
    return;
  }
  console.log('Database Disconnected');
});

module.exports = allUsers;
