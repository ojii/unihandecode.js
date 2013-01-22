/*
 License: GPL3
 Original Copyright: 2010 Hiroshi Miura <miurahr@linux.com>
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
unihandecode.helpers.module('unihandecode.ja.decoder', function(scope){
	scope.Decoder = Klass(unihandecode.BaseDecoder)({
		'load_codepoints': function(self){
			unihandecode.helpers.merge_objects(self.codepoints, unihandecode.ja.CODEPOINTS);
			self.kakasi = unihandecode.ja.jskakasi.kakasi();0
		},
		'decode': function(self, text){
			var result = self.kakasi.convert(text);
			return result.replace(/[^\x00-\x7f]/, function(x){
				return self.replace_point(x);
			});
		}
	});
	unihandecode.Unihan.register('ja', scope.Decoder);
});
