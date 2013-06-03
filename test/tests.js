if (typeof require === 'function') {
	var expect = require('expect.js'),
	Future = require('..')
	;
}

describe('Future', function() {

	describe('when a future is non-initialized', function() {
		var futr = new Future();

		it('#get returns undefined', function() {
			expect(futr.get()).to.be.an('undefined');
		});

		it('#has returns false', function() {
			expect(futr.has()).to.be(false);
		});

	});

	describe('when another future is non-initialized', function() {
		var futr = new Future();
		var value = "value has been set";
		var capture;

		it('#get used with a callback gets the value later', function() {
			expect(futr.get(function(val) {
				expect(val).to.be(value);
				capture = val;
			})).to.be.an('undefined');
		});

		it('#set succeeds the first time called', function() {
			futr.set(value);
		});

		it('since its now later, the value was captured', function() {
			expect(capture).to.eql(value);
		});

		it('#get returns the value', function() {
			expect(futr.get()).to.eql(value);
		});

		it('#has returns true', function() {
			expect(futr.has()).to.be(true);
		});

		it('#set throws when subsequently called', function() {
			expect(function() {
				futr.set("subsequent value");
			}).to.throwError();
		});

		it('#get used with a callback results in the callback being invoked immediately', function() {
			var bg;
			expect(
				futr.get(function(val) {
				bg = val;
			})).to.be(bg);
		});
	});

	describe('when a future is initialized', function() {
		var value = "it is initialized";

		var futr = Future.create(value);

		it('#get returns the value', function() {
			expect(futr.get()).to.be(value);
		})

		it('#has returns true', function() {
			expect(futr.has()).to.be(true);
		});

		it('#set throws when called', function() {
			expect(function() {
				futr.set("should fail");
			}).to.throwError();
		});

		it('#get used with a callback results in the callback being invoked immediately', function() {
			var bg;
			expect(
				futr.get(function(val) {
				bg = val;
			})).to.be(bg);
		});

	});
});