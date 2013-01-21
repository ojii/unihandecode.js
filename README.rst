###############
unihandecode.js
###############

US-ASCII transliterations of Unicode text

Ported from the amazing `unihandecode <https://github.com/miurahr/unihandecode>`_
library by Hiroshi Miura.


***********
Limitations
***********

The full uncompressed library weights about 8MB. So you should really only ever
send it gzipped over the wire (which brings the size down to about 1.4MB).

*****
Usage
*****

Development
===========

Include the following scripts (in that order) in your code:

* src/libs/klass.js
* src/libs/helpers.js
* src/base/unicodepoints.js
* src/basedecoder.js
* src/unihandecode.js

For Japanese support:

* src/ja/jskakasi/data/itaijidict2.pickle.js
* src/ja/jskakasi/data/kanadict2.pickle.js
* src/ja/jskakasi/data/kanwadict2.db.js
* src/ja/jskakasi/kanwa.js
* src/ja/jskakasi/j2h.js
* src/ja/jskakasi/j2a.js
* src/ja/jskakasi/k2a.js
* src/ja/jskakasi/kakasi.js
* src/ja/jacodepoints.js
* src/ja/jadecoder.js

For Chinese support:

* src/zh/zhcodepoints.js
* src/zh/zhdecoder.js

For Korean support:

* src/kr/krcodepoints.js
* src/kr/krdecoder.js

For Vietnamese support:

* src/vn/vncodepoints.js
* src/vn/vndecoder.js

For Diacritic support:

* src/diacritic/diacriticcodepoints.js
* src/diacritic/diacriticdecoder.js

Production
==========

Include the following:

* dist/unihandecode.core.min.js

And the languages you need:

* dist/unihandecode.ja.min.js
* dist/unihandecode.zh.min.js
* dist/unihandecode.kr.min.js
* dist/unihandecode.vn.min.js

API
===

To decode text, you need to create an instance of ``unihandecode.Unihan``. This class
takes the language ('ja', 'zh', 'kr', 'vn' and 'diacritic) as first argument,
and optionally a flag as second argument which can be set to true for debugging.
If debugging is enabled, some errors will cause the script to fail, while when
debugging is turned off, errors fail silently.

Instances of ``unihandecode.Unihan`` have a single method, ``decode``, which takes a
string as argument and returns the transliterated string.

For example to create a ``unihandecode.Unihan`` instance for Japanese::

    var u = unihandecode.Unihan('ja');

You can now call ``decode`` on it with a string to transliterate, for example::

    u.decode('ヨナス') // -> 'yonasu'


If you want to register other languages, use ``unihandecode.Unihan.register`` which
takes the language code as first argument, and a subclass of ``unihandecode.BaseDecoder`` as
second argument.


****
Demo
****

Warning: The page is 2MB big (8 if your browser doesn't support gzip)!

http://ojii.github.com/unihandecode.js/

Please wait for the page to fully load before using it.

*******
License
*******

As this is a port of `unihandecode <https://github.com/miurahr/unihandecode>`_,
it preserves the GPL3 license of that libary.
