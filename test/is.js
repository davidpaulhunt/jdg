var is = require('../helpers/is');
var should = require('should');

describe('Is', function() {
  describe('present()', function() {
    it('null should return false', function() {
      is.present(null).should.equal(false);
    });

    it('undefined should return false', function() {
      var foo;
      is.present(foo).should.equal(false);
    });

    it('1 should return true', function() {
      is.present(1).should.equal(true);
    });

    it('{} should return true', function() {
      is.present({}).should.equal(true);
    });

    it('[1,2,3] should return true', function() {
      is.present([1,2,3]).should.equal(true);
    });

    it('undefined should return false; then changing it should return true', function() {
      var foo;
      is.present(foo).should.equal(false);
      foo = "bar";
      is.present(foo).should.equal(true);
    });
  });

  describe('missing()', function() {
    it('null should return true', function() {
      is.missing(null).should.equal(true);
    });

    it('undefined should return true', function() {
      var foo;
      is.missing(foo).should.equal(true);
    });

    it('1 should return false', function() {
      is.missing(1).should.equal(false);
    });

    it('{} should return false', function() {
      is.missing({}).should.equal(false);
    });

    it('[1,2,3] should return true', function() {
      is.missing([1,2,3]).should.equal(false);
    });

    it('undefined should return true; then changing it should return false', function() {
      var foo;
      is.missing(foo).should.equal(true);
      foo = "bar";
      is.missing(foo).should.equal(false);
    });
  });

  describe('object()', function() {
    it('null should return false', function() {
      is.object(null).should.equal(false);
    });

    it('undefined should return false', function() {
      var foo;
      is.object(foo).should.equal(false);
    });

    it('[1,2,3] should return false', function() {
      is.object([1,2,3]).should.equal(false);
    });

    it('"hello world" should return false', function() {
      is.object("hello world").should.equal(false);
    });

    it('10 should return false', function() {
      is.object(10).should.equal(false);
    });

    it('foo should return false', function() {
      function foo() {
        return "bar";
      }
      is.object(foo).should.equal(false);
    });

    it('{} should return true', function() {
      is.object({}).should.equal(true);
    });

    it('{hello: "world"} should return true', function() {
      is.object({hello: "world"}).should.equal(true);
    });

    it('car should return true', function() {
      function Car(color){
        this.color = color;
      }
      var car = new Car('red');
      is.object(car).should.equal(true);
    });

    it('Car should return true', function() {
      var Car = {
        color: function(){ return 'red'; }
      };
      is.object(Car).should.equal(true);
    });
  });

  describe('array()', function() {
    it('null should return false', function() {
      is.array(null).should.equal(false);
    });

    it('undefined should return false', function() {
      var foo;
      is.array(foo).should.equal(false);
    });

    it('{} should return false', function() {
      is.array({}).should.equal(false);
    });

    it('"hello" should return false', function() {
      is.array("hello").should.equal(false);
    });

    it('10 should return false', function() {
      is.array(10).should.equal(false);
    });

    it('function should return false', function() {
      function foo() { return 'bar'; }
      is.array(foo).should.equal(false);
    });

    it('[] should return true', function() {
      is.array([]).should.equal(true);
    });

    it('foo should return true', function() {
      var foo = new Array();
      is.array(foo).should.equal(true);
    });
  });

  describe('empty()', function() {
    it('[1] should return false', function() {
      is.empty([1]).should.equal(false);
    });

    it('[1,3,78] should return false', function() {
      is.empty([1,3,78]).should.equal(false);
    });

    it('[] should return true', function() {
      is.empty([]).should.equal(true);
    });

    it('new Array() should return true', function() {
      is.empty(new Array()).should.equal(true);
    });
  });
});
