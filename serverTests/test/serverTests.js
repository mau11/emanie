var app = require('../../server.js');
var request = require('supertest')(app);
var should = require('should');
var expect = require('chai').expect;

describe('server',function(){
  it('should connect to server', function(done){
    request
    .get('/')
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });
});
