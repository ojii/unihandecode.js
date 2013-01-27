VERSION=$(shell cat VERSION)
SOURCEDIR=src/
JAPANESE=$(SOURCEDIR)ja/*.js $(SOURCEDIR)ja/jskakasi/data/*.js $(SOURCEDIR)ja/jskakasi/*.js
CHINESE=$(SOURCEDIR)zh/*.js
KOREAN=$(SOURCEDIR)kr/*.js
VIETNAMESE=$(SOURCEDIR)vn/*.js
DIACRITIC=$(SOURCEDIR)diacritic/*.js
CORE=$(SOURCEDIR)libs/*js $(SOURCEDIR)base/*.js $(SOURCEDIR)basedecoder.js $(SOURCEDIR)unihandecode.js
OUTDIR=dist
COMPRESSOR=yui-compressor
COMPRESSOR_FLAGS=--type js

define compress
	cat $1 | $(COMPRESSOR) $(COMPRESSOR_FLAGS) > $(OUTDIR)/unihandecode-$(VERSION).$2.min.js
endef

all: core ja zh kr vn diacritic docs

core:
	$(call compress,$(HELPERS) $(CORE),core)

ja:
	$(call compress,$(JAPANESE),ja)

zh:
	$(call compress,$(CHINESE),zh)

kr:
	$(call compress,$(KOREAN),kr)

vn:
	$(call compress,$(VIETNAMESE),vn)

diacritic:
	$(call compress,$(DIACRITIC),diacritic)

docs:
	make -C docs html

clean:
	rm $(RMFLAGS) $(OUTDIR)/*
