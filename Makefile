SOURCEDIR=src/
JAPANESE=$(SOURCEDIR)ja/*.js $(SOURCEDIR)ja/jskakasi/data/*.js $(SOURCEDIR)ja/jskakasi/*.js
CHINESE=$(SOURCEDIR)zh/*.js
KOREAN=$(SOURCEDIR)kr/*.js
VIETNAMESE=$(SOURCEDIR)vn/*.js
CORE=$(SOURCEDIR)libs/*js $(SOURCEDIR)base/*.js $(SOURCEDIR)basedecoder.js $(SOURCEDIR)unihandecode.js
OUTDIR=dist/
CORE_OUTFILE=$(OUTDIR)unihandecode.core.min.js
JA_OUTFILE=$(OUTDIR)unihandecode.ja.min.js
ZH_OUTFILE=$(OUTDIR)unihandecode.zh.min.js
KR_OUTFILE=$(OUTDIR)unihandecode.kr.min.js
VN_OUTFILE=$(OUTDIR)unihandecode.vn.min.js
COMPRESSOR=yui-compressor
COMPRESSOR_FLAGS=--type js

all: core ja zh kr vn

core:
	cat $(HELPERS) $(CORE) | $(COMPRESSOR) $(COMPRESSOR_FLAGS) > $(CORE_OUTFILE) 

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
	rm $(RMFLAGS) $(JA_OUTFILE)
	rm $(RMFLAGS) $(ZH_OUTFILE)
	rm $(RMFLAGS) $(KR_OUTFILE)
	rm $(RMFLAGS) $(VN_OUTFILE)
