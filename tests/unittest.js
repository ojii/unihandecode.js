/*
 License: GPL3
 Copyright 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
var unittest = (function(){
	var api = {};
	function startswith(s, w){
		return s.substr(0, w.length) === w;
	};
	function underline(length){
		return Array(length + 1).join('-');
	}
	function error(text){
		return '<span style="color: #f00; font-weight: bold">' + text + '</span>';
	}
	function plural(num, name){
		if (num > 1){
			return name + 's';
		} else {
			return name;
		}
	}
	api.AssertionError = function(message){
		this.message = message;
		this.name = 'AssertionError';
		this.is_unittest_assertion_error = true;
	};
	api.AssertionError.prototype = new Error();
	api.AssertionError.prototype.constructor = api.AssertionError;
	api.Suite = Klass()({
		'fail': function(self, message){
			throw new api.AssertionError(message);
		},
		'assert': function(self, thing){
			if (!thing){
				self.fail(thing);
			}
		},
		'assertEqual': function(self, a, b){
			if (a !== b){
				self.fail("'" + a + "' is not equal '" + b + "'");
			}
		},
		'assertRaises': function(self, func, errname, errmsg){
			var failed = false;
			try {
				func();
				failed = true;
			} catch (err){
				if (errname && err.name !== errname){
					self.fail("Expected error " + errname + " but got " + err.name + " instead.");
				}
				if (errmsg && err.message !== errmsg){
					self.fail("Expected error message '" + errmsg + "' but got '" + err.message + "' instead.");
				}
			}
			if (failed){
				self.fail("Expected an error to be raised, but none was");
			}
		}
	});
	api.run = function(suite_klass){
		document.body.textContent = '';
		document.body.style['white-space'] = 'pre';
		document.body.style['font-family'] = 'monospace';
		var suite = suite_klass();
		var errors = [];
		var success = [];
		var failed = [];
		for (var attr in suite){
			if (suite.hasOwnProperty(attr) && startswith(attr, 'test_')){
				try {
					suite[attr]();
					document.write('.');
					success.push({
						'test': attr
					});
				} catch (e) {
					if (e.is_unittest_assertion_error){
						document.write('F');
						failed.push({
							'test': attr,
							'message': e.message
						});
					} else {
						document.write(error('E'));
						errors.push({
							'test': attr,
							'error': e
						});
					}
				}
			}
		}
		document.write('\n');
		document.write('\n');
		document.write('Results\n');
		document.write('-------\n');
		document.write('Ran ' + (errors.length + failed.length + success.length) + ' tests.\n');
		if (failed.length){
			document.write('\n');
			document.write(error(failed.length + ' ' + plural(failed.length, 'failure') + ':') + '\n\n');
			for (var i = 0, l = failed.length; i < l; i++){
				var fail = failed[i];
				document.write('  ' + fail.test + ': ' + fail.message + '\n');
			}
		}
		if (errors.length){
			document.write('\n');
			document.write(error(errors.length + ' ' + plural(errors.length, 'error') + ':') + '\n\n');
			for (var i = 0, l = errors.length; i < l; i++){
				var err = errors[i];
				document.write(err.test + '\n');
				document.write(underline(err.test.length) + '\n');
				document.write(error(err.error.name) + ': ' + err.error.message + '\n');
				document.write('\n');
			}
		}
		if (!errors.length && !failed.length){
			document.write('\nOK.');
		}

	};
	return api;
})();
