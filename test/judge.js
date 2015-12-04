var judge = require('../judge');
var should = require('should');

describe('Judge', function() {
  describe('isInArray()', function() {
    it('[], 1 should return false', function() {
      judge.isInArray([], 1).should.equal(false);
    });

    it('[10, 5], 1 should return false', function() {
      judge.isInArray([10,5], 1).should.equal(false);
    });

    it('[10, 5, 1], 1 should return true', function() {
      judge.isInArray([10,5,1],1).should.equal(true);
    });

    it('[10, 5, 1, "hello"], "hello" should return true', function() {
      judge.isInArray([10,5,1,'hello'], 'hello').should.equal(true);
    });

    it('[{name: "bob", tags: ["foo", "bar"]}, {name: "bob", tags: ["thing"]}], {name: "bob"} should return true', function() {
      judge.isInArray([{name: "bob", tags: ["foo", "bar"]}, {name: "bob", tags: ["thing"]}], {name: 'bob'}).should.equal(true);
    });

    it('[{name: "bob", tags: ["foo", "bar"]}, {name: "bob", tags: ["thing"]}], {name: "ed"} should return false', function() {
      judge.isInArray([{name: "bob", tags: ["foo", "bar"]}, {name: "bob", tags: ["thing"]}], {name: 'ed'}).should.equal(false);
    });

    it('[{name: "bob", tags: ["foo", "bar"]}, {name: "bob", tags: ["thing"]}], {name: "bob", tags: ["other_thing"]} should return false', function() {
      judge.isInArray([{name: "bob", tags: ["foo", "bar"]}, {name: "bob", tags: ["thing"]}], {name: 'bob', tags: ['other_thing']}).should.equal(false);
    });
  });
});
