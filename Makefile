HELPERS=klass.js pycompat.js
DATA=data/*.js
CODEPOINTS=unicodepoints.js zhcodepoints.js krcodepoints.js vncodepoints.js jacodepoints.js
PYKAKASI=pykakasi/*.js
DECODERS=unidecoder.js zhdecoder.js krdecoder.js vndecoder.js jadecoder.js
CORE=unihandecode.js
FILES=$(HELPERS) $(DATA) $(CODEPOINTS) $(PYKAKASI) $(DECODERS) $(CORE)
OUTFILE=unihandecode.min.js
COMPRESSOR=yui-compressor
COMPRESSOR_FLAGS=--type js

all:
	cat $(FILES) | $(COMPRESSOR) $(COMPRESSOR_FLAGS) > $(OUTFILE)

