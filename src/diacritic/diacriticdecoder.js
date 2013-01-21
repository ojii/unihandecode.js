unihandecode.helpers.module('unihandecode.diacritic', function(scope){
	scope.Decoder = Klass(unihandecode.BaseDecoder)({
		'load_codepoints': function(self){
			unihandecode.helpers.merge_objects(self.codepoints, unihandecode.diacritic.CODEPOINTS);
		}
	});

	unihandecode.Unihan.register('diacritic', scope.Decoder);
});
