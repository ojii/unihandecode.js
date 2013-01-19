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

* klass.js
* pycompat.js
* data/itaijidict2.pickle.js
* data/kanadict2.pickle.js
* data/kanwadict2.db.js
* unicodepoints.js
* jacodepoints.js
* zhcodepoints.js
* krcodepoints.js
* vncodepoints.js
* pykakasi/kanwa.js
* pykakasi/j2h.js
* pykakasi/j2a.js
* pykakasi/k2a.js
* pykakasi/kakasi.js
* unidecoder.js
* jadecoder.js
* zhdecoder.js
* krdecoder.js
* vndecoder.js
* unihandecode.js

Production
==========

Include unihandecode.min.js.

API
===

To decode text, you need to create an instance of ``Unihandecoder``. This class
takes the language ('ja', 'zh', 'kr' or 'vn') as first argument, and optionally
a flag as second argument which can be set to true for debugging. If debugging
is enabled, some errors will cause the script to fail, while when debugging is
turned off, errors fail silently.

Instances of ``Unihandecoder`` have a single method, ``decode``, which takes a
string as argument and returns the transliterated string.

For example to create a ``Unihandecoder`` instance for Japanese::

    var u = Unihandecoder('ja');

You can now call ``decode`` on it with a string to transliterate, for example::

    u.decode('ヨナス') // -> 'yonasu'


****
Demo
****

Warning: The page is 8MBs big!

http://ojii.github.com/unihandecode.js/

Please wait for the page to fully load before using it.


*******
License
*******

As this is a port of `unihandecode <https://github.com/miurahr/unihandecode>`_,
it preserves the GPL3 license of that libary.
