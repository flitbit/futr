futr [![Build Status](https://travis-ci.org/flitbit/futr.png)](http://travis-ci.org/flitbit/futr)
====

Simple Future Variables in javascript.

## Installation

[node.js](http://nodejs.org)
```bash
$ npm install futr
```

## Example

```javascript
var Future = require('futr')
, assert = require('assert')
;

var one = Future.create()
, two = Future.create()
;

// One has no value...

assert.ok(!one.get());
assert.ok(typeof one.get() === 'undefined');

one.set(1);

assert.strictEqual(1, one.get());

assert.throws(function() {
	// Futures are set once...
	one.set(2);
});

// Futures will invoke a callback if one
// is given to the #get method.
var capture;

var before = two.get(function (val) {
	capture = val;
});

assert.ok(typeof before === 'undefined');
assert.ok(typeof capture === 'undefined');

// now set the second future...
var after = two.set(2);

assert.strictEqual(after, 2);

// and check that the callback was invoked.
assert.strictEqual(capture, 2);

// Futures will report whether they have a value...
assert.ok(one.has());
assert.ok(two.has());
assert.ok(!three.has());
```
