var get = require('../helpers/get');
var should = require('should');

describe('Get', function() {
  describe('keys()', function() {
    it('{foo: "bar", hello: "world"} should return an Array', function() {
      var result = get.keys({foo: 'bar', hello: 'world'});
      result.should.be.instanceOf(Array);
    });

    it('{foo: "bar", hello: "world"} should return ["foo", "hello"]', function() {
      var result = get.keys({foo: 'bar', hello: 'world'});
      result.should.containDeep(['foo', 'hello']);
    });
  });
});
