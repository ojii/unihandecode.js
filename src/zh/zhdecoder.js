/*
 License: GPL3
 Original Copyright: 2010 Hiroshi Miura <miurahr@linux.com>
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
unihandecode.helpers.module('unihandecode.zh', function(scope){
	scope.Decoder = Klass(unihandecode.BaseDecoder)({
		'load_codepoints': function(self){
			unihandecode.helpers.merge_objects(self.codepoints, unihandecode.base.CODEPOINTS);
			unihandecode.helpers.merge_objects(self.codepoints, unihandecode.zh.CODEPOINTS);
		}
	});
	unihandecode.register_decoder('zh', scope.Decoder);
});
