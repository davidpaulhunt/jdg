# jdg v1.0.0
A simple set of tools for comparing given and expected results. It is meant to be semantically clear and concise, returning a simple truthy response. This is ideal for testing.

## Installation

To use jdg through your project:

```js
$ npm install --save jdg
```

To only use jdg for testing, add jdg to your devDependencies and:

```js
$ npm install jdg
```

## Examples

These examples use mocha and shouldjs.

```js
var jdg = require('jdg');
var should = require('should');

describe('GET /users', function() {
  it('should include Bob', function() {
    var users = someRequest('/users');
    jdg.isInArray(users, {name: 'Bob', id: 4}).should.equal(true);
  });
});
```
