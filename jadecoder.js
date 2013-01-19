/*
 License: GPL3
 Original Copyright: 2010 Hiroshi Miura <miurahr@linux.com>
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
var Jadecoder = Klass(Unidecoder)({
	'__init__': function(self){
		self.codepoints = CODEPOINTS;
		PY_DICT_UPDATE(self.codepoints, JACODES);
		self.kakasi = kakasi();
	},
	'decode': function(self, text){
		var result = self.kakasi.convert(text);
		return result.replace(/[^\x00-\x7f]/, function(x){
			return self.replace_point(x);
		});
	}
})
