/*
 License: GPL3
 Original Copyright: 2010 Hiroshi Miura <miurahr@linux.com>
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
var Zhdecoder = Klass(Unidecoder)({
	'load_codepoints': function(self){
		PY_DICT_UPDATE(self.codepoints, CODEPOINTS);
		PY_DICT_UPDATE(self.codepoints, ZHCODES);
	}
});
