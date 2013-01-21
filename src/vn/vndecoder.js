/*
 License: GPL3
 Original Copyright: 2010 Hiroshi Miura <miurahr@linux.com>
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
unihandecode.helpers.module('unihandecode.vn', function(scope){
	scope.Decoder = Klass(unihandecode.BaseDecoder)({
		'load_codepoints': function(self){
			unihandecode.helpers.merge_objects(self.codepoints, unihandecode.base.CODEPOINTS);
			unihandecode.helpers.merge_objects(self.codepoints, unihandecode.vn.CODEPOINTS);
		}
	});
	unihandecode.Unihan.register('vn', scope.Decoder);
});
