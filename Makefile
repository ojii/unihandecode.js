HELPERS=klass.js pycompat.js
COREDATA=data/*.js unicodepoints.js
JAPANESE=jacodepoints.js jadecoder.js pykakasi/*.js
CHINESE=zhcodepoints.js zhdecoder.js
KOREAN=krcodepoints.js krdecoder.js
VIETNAMESE=vncodepoints.js vndecoder.js
CORE=unihandecode.js unidecoder.js
OUTDIR=dist/
CORE_OUTFILE=$(OUTDIR)unihandecode.core.min.js
COREDATA_OUTFILE=$(OUTDIR)unihandecode.data.min.js
JA_OUTFILE=$(OUTDIR)unihandecode.ja.min.js
ZH_OUTFILE=$(OUTDIR)unihandecode.zh.min.js
KR_OUTFILE=$(OUTDIR)unihandecode.kr.min.js
VN_OUTFILE=$(OUTDIR)unihandecode.vn.min.js
COMPRESSOR=yui-compressor
COMPRESSOR_FLAGS=--type js

all: core coredata ja zh kr vn

core:
	cat $(HELPERS) $(CORE) | $(COMPRESSOR) $(COMPRESSOR_FLAGS) > $(CORE_OUTFILE) 

coredata:
	cat $(COREDATA) | $(COMPRESSOR) $(COMPRESSOR_FLAGS) > $(COREDATA_OUTFILE) 

ja:
	cat $(JAPANESE) | $(COMPRESSOR) $(COMPRESSOR_FLAGS) > $(JA_OUTFILE)

zh:
	cat $(CHINESE) | $(COMPRESSOR) $(COMPRESSOR_FLAGS) > $(ZH_OUTFILE)

kr:
	cat $(KOREAN) | $(COMPRESSOR) $(COMPRESSOR_FLAGS) > $(KR_OUTFILE)

vn:
	cat $(VIETNAMESE) | $(COMPRESSOR) $(COMPRESSOR_FLAGS) > $(VN_OUTFILE)

clean:
	rm $(RMFLAGS) $(CORE_OUTFILE)
	rm $(RMFLAGS) $(COREDATA_OUTFILE)
	rm $(RMFLAGS) $(JA_OUTFILE)
	rm $(RMFLAGS) $(ZH_OUTFILE)
	rm $(RMFLAGS) $(KR_OUTFILE)
	rm $(RMFLAGS) $(VN_OUTFILE)
