/*
 License: GPL3
 Copyright 2013 Jonas Obrist <ojiidotch@gmail.com>

 Test strings taken from wikipedia.
 */

var UnihandecodeJSTests = Klass(unittest.Suite)({
	'_strip': function(self, s){
		return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	},
	'assertDecodes': function(self, lang, original, output){
		self.assertEqual(self._strip(unihandecode.Unihan(lang).decode(original)), output);
	},
	'test_japanese': function(self){
		self.assertDecodes('ja', '日本語が話せます', 'NIHONGO ga HANASE masu');
	},
	'test_japanese_mixed': function(self){
		self.assertDecodes('ja', '日本語が話せますtest', 'NIHONGO ga HANASE masu test');
	},
	'test_korean': function(self){
		self.assertDecodes('kr', '한국어', 'hangugeo');
	},
	'test_korean_mixed': function(self){
		self.assertDecodes('kr', '한국어 test', 'hangugeo test');
	},
	'test_chinese': function(self){
		self.assertDecodes('zh', '中文', 'Zhong Wen');
	},
	'test_chinese_mixed': function(self){
		self.assertDecodes('zh', '中文test', 'Zhong Wen test');
	},
	'test_vietnamese': function(self){
		self.assertDecodes('vn', 'tiếng Việt', 'tieng Viet');
	},
	'test_vietnamese_mixed': function(self){
		self.assertDecodes('vn', 'tiếng Việt test', 'tieng Viet test');
	},
	'test_diacritic': function(self){
		self.assertDecodes('diacritic', 'öäüéàèç', 'oaueaec');
	},
	'test_diacritic_mixed': function(self){
		self.assertDecodes('diacritic', 'aouöäüéàèç', 'aouoaueaec');
	},
	'test_invalid_language': function(self){
		self.assertRaises(function(){
			unihandecode.Unihan('!XX');
		}, 'Error');
	},
	'test_custom_decoder': function(self){
		var TestDecoder = Klass(unihandecode.BaseDecoder)({
			'decode': function(self, text){
				return 'TEST';
			}
		});
		unihandecode.register_decoder('TEST', TestDecoder)
		try {
			var u = unihandecode.Unihan('TEST');
			var output = u.decode('日本語');
			self.assertEqual(output, 'TEST');
		} finally {
			unihandecode.unregister_decoder('TEST');
		}
	}
});
unittest.run(UnihandecodeJSTests);
