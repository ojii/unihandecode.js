/*
 kanwa.js

 Copyright 2013 Jonas Obrist <ojiidotch@gmail.com>

 Original Copyright: Copyright 2011 Hiroshi Miura <miurahr@linux.com>
 */
unihandecode.helpers.module('unihandecode.ja.jskakasi', function(scope){
	scope.kanwa = Klass()({
		'_kanwadict': unihandecode.ja.jskakasi.data.KANWADICT2,
		'_itaijidict': unihandecode.ja.jskakasi.data.ITAIJIDICT2,
		'_jisyo_table': {},

		'haskey': function(self, key){
			return self._itaijidict.hasOwnProperty(key);
		},

		'lookup': function(self, key){
			return self._itaijidict[key];
		},

		'load': function(self, character){
			var key = character.charCodeAt(0).toString(16);
			while (key.length < 4){
				key = '0' + key;
			}
			if (!self._jisyo_table.hasOwnProperty(key)){
				try {
					self._jisyo_table[key] = self._kanwadict[key];
				} catch (e) {
					return null;
				}
			}
			return self._jisyo_table[key];
		}
	});
});
