/*
 License: GPL3
 Original Copyright: 2010 Hiroshi Miura <miurahr@linux.com>
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
var Unidecoder = Klass()({
	'__init__': function(self){
		self.codepoints = {};
		PY_DICT_UPDATE(self.codepoints, HANCODES);
	},

	'decode': function(self, text){
		return text.replace(/[^\x00-\x7f]/, function(x){
			return self.replace_point(x);
		});
	},

	'replace_point': function(self, codepoint){
		try {
			return self.codepoints[self.code_group(codepoint)][self.grouped_point(codepoint)];
		} catch (e){
			return '';
		}
	},

	'code_group': function(self, character){
		var key = character.charCodeAt(0).toString(16) >> 8;
		while (key.length < 2){
			key = '0' + key;
		}
		return key;
	},

	'grouped_point': function(self, character){
		return character.charCodeAt(0).toString(16) & 255;
	}
});
