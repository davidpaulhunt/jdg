# jdg v1.0.2 [![Build Status](https://api.travis-ci.org/davidpaulhunt/jdg.svg?branch=master)](http://travis-ci.org/davidpaulhunt/jdg)

A simple set of tools for comparing given and expected results. It is meant to be semantically clear and concise, returning a simple truthy response. This is ideal for testing.

## Installation

To use jdg throughout your project:

```js
$ npm install --save jdg
```

To only use jdg for testing, add jdg to your devDependencies and:

```js
$ npm install jdg
```

## Examples

A testing example using mocha and shouldjs:

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

And an example using jdg outside of your testing suite:

```js
var jdg = require('jdg');

function updateUser(user, attrs, opts) {
  attrs.forEach(function(attr) {
    if (jdg.isInArray(user.baseAttrs, attr)) {
      // do something
    }
  });
}
```

Jdg's underlying helpers `is` and `get` are also exposed for use:

```js
function updateUser(user, attrs, opts) {
  if (jdg.is.missing(user)) {
    // throw some error
  } else {
    var userAttrs = jdg.get.keys(user);
    // do something
  }
}
```

## Issues

If you're using jdg and find a problem, feel free to [report](https://github.com/davidpaulhunt/jdg/issues/new) the issue here on Github. This helps determine if an issue has already been reported and if there is a fix already in progress.
