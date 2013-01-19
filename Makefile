FILES=klass.js pycompat.js data/*.js unicodepoints.js jacodepoints.js pykakasi/*.js unidecoder.js jadecoder.js unihandecode.js
OUTFILE=unihandecode.min.js
COMPRESSOR=yui-compressor
COMPRESSOR_FLAGS=--type js

all:
	cat $(FILES) | $(COMPRESSOR) $(COMPRESSOR_FLAGS) > $(OUTFILE)

