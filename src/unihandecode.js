/*
 License: GPL3
 Original Copyright: 2010 Hiroshi Miura <miurahr@linux.com>
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
unihandecode.helpers.module('unihandecode', function(scope){
	var decoders = {};
	scope.Unihan = Klass()({
		'__init__': function(self, lang, debug){
			var debug = debug || false;
			var klass = decoders[lang];
			if (!klass){
				var tmp = [];
				for (var attr in decoders){
					if (decoders.hasOwnProperty(attr)){
						tmp.push(attr);
					}
				}
				throw Error("'" + lang + "' is not a supported language, supported languages are: " + tmp.join(','));

			}
			self.decoder = klass(debug);
		},
		'decode': function(self, text){
			// normalize
			return self.decoder.decode(text);
		}
	});
	scope.register_decoder = function(lang, decoder){
		decoders[lang] = decoder;
	};
	scope.unregister_decoder = function(lang){
		if (decoders.hasOwnProperty(lang)){
			delete decoders[lang];
		}
	};
});
