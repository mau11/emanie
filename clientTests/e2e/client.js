// To run this test, enter
// $ npm run client
describe('Emanie (prior to log in)', function() {

  it('should load page', function (client, done) {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 1000)
      .assert.title('Emanie') // remove this
      .assert.visible('.navbar-inverse')
      .assert.visible('.form.control')
      .pause(1000);
    });

  after(function(client, done) {
    client.end(function() {
      done();
    });
  });
});
