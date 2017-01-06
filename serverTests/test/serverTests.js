var should = require('should');
var supertest = require('supertest');
var server = supertest.agent('http://localhost:8000');

// Start up server prior to running test.
describe('server',function(){
  it('should connect to server', function(done){
    server
    .get('/')
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });
});
