/*
 License: GPL3
 Copyright 2013 Jonas Obrist <ojiidotch@gmail.com>

 Test strings taken from wikipedia.
 */

function PY_STR_STRIP(s){
	return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

var UnihandecodeJSTests = Klass(unittest.Suite)({
	'assertDecodes': function(self, lang, original, output){
		self.assertEqual(PY_STR_STRIP(Unihandecoder(lang).decode(original)), output);
	},
	'test_japanese': function(self){
		self.assertDecodes('ja', '日本語', 'NIHONGO');
	},
	'test_korean': function(self){
		self.assertDecodes('kr', '한국어', 'hangugeo');
	},
	'test_chinese': function(self){
		self.assertDecodes('zh', '中文', 'Zhong Wen');
	},
	'test_vietnamese': function(self){
		self.assertDecodes('vn', 'tiếng Việt', 'tieng Viet');
	},
	'test_invalid_language': function(self){
		self.assertRaises(function(){
			Unihandecoder('!XX');
		}, 'Error');
	},
	'test_custom_decoder': function(self){
		var TestDecoder = Klass(BaseDecoder)({
			'decode': function(self, text){
				return 'TEST';
			}
		});
		Unihandecoder.register('TEST', TestDecoder)
		try {
			var u = Unihandecoder('TEST');
			var output = u.decode('日本語');
			self.assertEqual(output, 'TEST');
		} finally {
			delete Unihandecoder.decoders['TEST'];
		}
	}
});
unittest.run(UnihandecodeJSTests);
