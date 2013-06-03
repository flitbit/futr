var expect = require('expect.js'),
Future = require('..')

var non = new Future();

expect(non.get()).to.be.an('undefined');

expect(non.has()).to.be(false);

var value = "value has been set";
non.set(value);

expect(non.get()).to.eql(value);


expect(function() {
non.set("should throw");
}).to.throwError();

var init = new Future('initialized');
var what;

init.get(function(val){
	what = val;
});

expect(what).to.be(init.get());

var futr = new Future();
value = "value has been set";
var capture;

expect(futr.get(function(val) {
	expect(val).to.be(value);
	capture = val;
})).to.be.an('undefined');

futr.set(value);

expect(capture).to.be(value);

expect(futr.get()).to.eql(value);

expect(futr.has()).to.be(true);

expect(function() {
	futr.set("subsequent value");
}).to.throwError();

var bg;
expect(
	futr.get(function(val) {
		bg = val;
	})).to.be(bg);
