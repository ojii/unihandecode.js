/*
 License: GPL3
 Original Copyright: 2010 Hiroshi Miura <miurahr@linux.com>
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
unihandecode.helpers.module('unihandecode', function(scope){
	scope.Unihan = Klass()({
		'decoders': {},
		'__init__': function(self, lang, debug){
			var debug = debug || false;
			var klass = self.decoders[lang];
			if (!klass){
				var decoders = [];
				for (var attr in self.decoders){
					if (self.decoders.hasOwnProperty(attr)){
						decoders.push(attr);
					}
				}
				throw Error("'" + lang + "' is not a supported language, supported languages are: " + decoders.join(','));

			}
			self.decoder = klass(debug);
		},
		'decode': function(self, text){
			// normalize
			return self.decoder.decode(text);
		}
	});

	scope.Unihan.register = function(lang, decoder){
		scope.Unihan.decoders[lang] = decoder;
	};

});
