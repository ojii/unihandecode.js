/*
 License: GPL3
 Original Copyright: 2010 Hiroshi Miura <miurahr@linux.com>
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
var Unidecoder = Klass()({
	'__init__': function(self, debug){
		self.codepoints = {};
		self.debug = debug || false;
		self.load_codepoints();
	},

	'load_codepoints': function(){},

	'decode': function(self, text){
		return text.replace(/[^\x00-\x7f]/g, function(x){
			return self.replace_point(x);
		});
	},

	'replace_point': function(self, codepoint){
		try {
			return self.codepoints[self.code_group(codepoint)][self.grouped_point(codepoint)];
		} catch (e){
			if (self.debug){
				throw e;
			}
			return '';
		}
	},

	'code_group': function(self, character){
		var key = (character.charCodeAt(0) >> 8).toString(16);
		while (key.length < 2){
			key = '0' + key;
		}
		return 'x' + key;
	},

	'grouped_point': function(self, character){
		return character.charCodeAt(0) & 255;
	}
});
