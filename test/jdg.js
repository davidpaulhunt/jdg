var jdg = require('../jdg');
var should = require('should');

describe('jdg', function() {
  describe('isInArray()', function() {
    it('[], 1 should return false', function() {
      jdg.isInArray([], 1).should.equal(false);
    });

    it('[10, 5], 1 should return false', function() {
      jdg.isInArray([10,5], 1).should.equal(false);
    });

    it('[10, 5, 1], 1 should return true', function() {
      jdg.isInArray([10,5,1],1).should.equal(true);
    });

    it('[10, 5, 1, "hello"], "hello" should return true', function() {
      jdg.isInArray([10,5,1,'hello'], 'hello').should.equal(true);
    });

    it('[{name: "bob", tags: ["foo", "bar"]}, {name: "bob", tags: ["thing"]}], {name: "bob"} should return true', function() {
      jdg.isInArray([{name: "bob", tags: ["foo", "bar"]}, {name: "bob", tags: ["thing"]}], {name: 'bob'}).should.equal(true);
    });

    it('[{name: "bob", tags: ["foo", "bar"]}, {name: "bob", tags: ["thing"]}], {name: "ed"} should return false', function() {
      jdg.isInArray([{name: "bob", tags: ["foo", "bar"]}, {name: "bob", tags: ["thing"]}], {name: 'ed'}).should.equal(false);
    });

    it('[{name: "bob", tags: ["foo", "bar"]}, {name: "bob", tags: ["thing"]}], {name: "bob", tags: ["other_thing"]} should return false', function() {
      jdg.isInArray([{name: "bob", tags: ["foo", "bar"]}, {name: "bob", tags: ["thing"]}], {name: 'bob', tags: ['other_thing']}).should.equal(false);
    });
  });

  describe('hasKey()', function() {
    it('{}, "foo" should return false', function() {
      jdg.hasKey({}, 'foo').should.equal(false);
    });

    it('{foo: "bar"}, "bar" should return false', function() {
      jdg.hasKey({foo: 'bar'}, 'bar').should.equal(false);
    });

    it('{foo: "bar"}, "thing" should return false', function() {
      jdg.hasKey({foo: 'bar'}, 'thing').should.equal(false);
    });

    it('{foo: "bar"}, "foo" should return true', function() {
      jdg.hasKey({foo: 'bar'}, 'foo').should.equal(true);
    });

    it('{foo: "bar", thing: "stuff"}, "thing" should return true', function() {
      jdg.hasKey({foo: 'bar', thing: 'stuff'}, 'thing').should.equal(true);
    });
  });

  describe('hasKeys()', function() {
    it('{}, ["foo"] should return false', function() {
      jdg.hasKeys({}, ['foo']).should.equal(false);
    });

    it('{foo: "bar"}, ["bar"] should return false', function() {
      jdg.hasKeys({foo: 'bar'}, ['bar']).should.equal(false);
    });

    it('{foo: "bar"}, ["thing"] should return false', function() {
      jdg.hasKeys({foo: 'bar'}, ['thing']).should.equal(false);
    });

    it('{foo: "bar", thing: "stuff"}, ["thing"], null, true should return false', function() {
      jdg.hasKeys({foo: 'bar', thing: 'stuff'}, ['thing'], null, true).should.equal(false);
    });

    it('{foo: "bar"}, ["foo"] should return true', function() {
      jdg.hasKeys({foo: 'bar'}, ['foo']).should.equal(true);
    });

    it('{foo: "bar", thing: "stuff"}, ["thing"] should return true', function() {
      jdg.hasKeys({foo: 'bar', thing: 'stuff'}, ['thing']).should.equal(true);
    });

    it('{foo: "bar", thing: "stuff"}, ["foo", "thing"] should return true', function() {
      jdg.hasKeys({foo: 'bar', thing: 'stuff'}, ['foo', 'thing']).should.equal(true);
    });

    it('{foo: "bar", thing: "stuff"}, ["foo", "thing"], null, true should return true', function() {
      jdg.hasKeys({foo: 'bar', thing: 'stuff'}, ['foo', 'thing'], null, true).should.equal(true);
    });
  });

  describe('hasValue()', function() {
    it('{foo: "bar", items: [9,1,4]}, [1,4,9], false should return false', function() {
      jdg.hasValue({foo: 'bar', items: [9,1,4]}, [1,4,9], false).should.equal(false);
    });

    it('{foo: "bar"}, "bar" should return true', function() {
      jdg.hasValue({foo: 'bar'}, 'bar').should.equal(true);
    });

    it('{foo: "bar", items: [9,1,4]}, [1,4,9] should return true', function() {
      jdg.hasValue({foo: 'bar', items: [9,1,4]}, [1,4,9]).should.equal(true);
    });

    it('{foo: "bar", items: [9,1,4]}, [9,1,4], false should return true', function() {
      jdg.hasValue({foo: 'bar', items: [9,1,4]}, [9,1,4], false).should.equal(true);
    });
  });
});
