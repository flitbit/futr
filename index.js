;(function(undefined) {
	"use strict";

	var $scope
	, conflict, conflictResolution = [];
	if (typeof global == 'object' && global) {
		$scope = global;
		conflict = global.Future;
	} else if (typeof window !== 'undefined'){
		$scope = window;
		conflict = window.Future;
	} else {
		$scope = {};
	}
	if (conflict) {
		conflictResolution.push(
			function() {
				if ($scope.Future === Future) {
					$scope.Future = conflict;
					conflict = undefined;
				}
			});
	}

function Future(val, isFactory) {
	Object.defineProperty(this, '_callbacks', { value: [] });
	if (typeof val !== 'undefined') {
		this.set(val, isFactory);
	}
}

Object.defineProperties(Future.prototype,
{
	notify:
	{
		value: function(callback) {
			if (callback) {
				if (typeof val !== 'undefined') {
					callback((this._isFactory) ? this._val() : this._val);
				} else {
					this._callbacks.push(callback);
				}
			} else {
				var callbacks = this._callbacks
				, len = (callbacks) ? callbacks.length : 0
				, i = -1
				, val = this._val
				, isFactory = this._isFactory
				;
				while(++i < len) {
					callbacks[i]((isFactory) ? val() : val);
				}
				this._callbacks.length = 0;
			}
		}
	},
	has:
	{
		value: function() {
			return typeof this._val !== 'undefined';
		},
		enumerable: true
	},
	get:
	{
		value: function(callback)
		{
			var res
			;
			if (typeof this._val === 'undefined' && callback) {
				this.notify(callback);
			} else {
				var res = (this._isFactory) ? this._val() : this._val;
				if (callback) {
					callback(res);
				}
			}
			return res;
		},
		enumerable: true
	},
	set:
	{
		value: function(val, isFactory) {
			if (typeof this._val !== 'undefined') {
				throw new Error('Invalid operation; future variable already set.');
			}
			Object.defineProperties(this, {
				_val: { value: val },
				_isFactory: { value: isFactory && typeof val === "function" }
			});
			this.notify();
			return (isFactory) ? val() : val;
		},
		enumerable: true
	}
});

Future.create = function(val, isFactory) {
	return new Future(val, isFactory);
};

Future.noConflict = function () {
		if (conflictResolution) {
			conflictResolution.forEach(function (it) { it(); });
			conflictResolution = null;
		}
		return Define;
	}

	if (typeof module != 'undefined' && module && typeof exports == 'object' && exports && module.exports === exports) {
		module.exports = Future; // nodejs
	} else {
		$scope.Future = Future; // other... browser?
	}
}());
