/*
 License: GPL3
 Original Copyright: 2010 Hiroshi Miura <miurahr@linux.com>
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
var Unihandecoder = Klass()({
	'__init__': function(self, lang, encoding){
		self.lang = lang || 'zh';
		self.encoding = encoding || 'utf-8';
		switch (self.lang){
			case 'ja':
				self.decoder = Jadecoder();
				break;
			case 'kr':
				self.decoder = Krdecoder();
				break;
			case 'vn':
				self.decoder = Vndecoder();
				break;
			default:
				self.decoder = Unidecoder();
				break;
		}
	},
	'decode': function(self, text){
		// normalize
		return self.decoder.decode(text);
	}
});


