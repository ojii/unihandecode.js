var DiacriticDecoder = Klass(BaseDecoder)({
	'load_codepoints': function(self){
		PY_DICT_UPDATE(self.codepoints, DIACRITICCODES);
	}
});

Unihandecoder.register('diacritic', DiacriticDecoder);
