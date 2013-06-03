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

function Future(val) {
	Object.defineProperty(this, '_callbacks', { value: [] });
	if (typeof val !== 'undefined') {
		this.set(val);
	}
}

Object.defineProperties(Future.prototype,
{
	notify:
	{
		value: function(callback) {
			var val = this._val;
			if (callback) {
				if (typeof val !== 'undefined') {
					callback(val);
				} else {
					this._callbacks.push(callback);
				}
			} else {
				var callbacks = this._callbacks
				, len = (callbacks) ? callbacks.length : 0
				, i = -1
				;
				while(++i < len) {
					callbacks[i](val);
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
			if (typeof callback === 'function') {
				this.notify(callback);
			}
			return this._val;
		},
		enumerable: true
	},
	set:
	{
		value: function(val) {
			if (typeof this._val !== 'undefined') {
				throw new Error('Invalid operation; future variable already set.');
			}
			Object.defineProperty(this, "_val", { value: val });
			this.notify();
			return val;
		},
		enumerable: true
	}
});

Future.create = function(val) {
	return new Future(val);
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
