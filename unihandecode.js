/*
 License: GPL3
 Original Copyright: 2010 Hiroshi Miura <miurahr@linux.com>
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
var Unihandecoder = Klass()({
	'__init__': function(self, lang, debug){
		var klass;
		self.lang = lang;
		self.debug = debug || false;
		switch (self.lang){
			case 'ja':
				klass = Jadecoder;
				break;
			case 'kr':
				klass = Krdecoder;
				break;
			case 'vn':
				klass = Vndecoder;
				break;
			case 'zh':
				klass = Zhdecoder;
				break;
			default:
				throw Error("You must define a valid language, valid languages are: 'ja', 'kr', 'vn' and 'zh'.")
		}
		self.decoder = klass(self.debug);
	},
	'decode': function(self, text){
		// normalize
		return self.decoder.decode(text);
	}
});


