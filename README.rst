###############
unihandecode.js
###############

US-ASCII transliterations of Unicode text

Ported from the amazing `unihandecode <https://github.com/miurahr/unihandecode>`_
library by Hiroshi Miura.


***********
Limitations
***********

So far, only Japanese transliteration has been ported.

*****
Usage
*****

Include the following scripts (in that order) in your code:

* klass.js
* pycompat.js
* data/itaijidict2.pickle.js
* data/kanadict2.pickle.js
* data/kanwadict2.db.js
* unicodepoints.js
* jacodepoints.js
* pykakasi/kanwa.js
* pykakasi/j2h.js
* pykakasi/j2a.js
* pykakasi/k2a.js
* pykakasi/kakasi.js
* unidecoder.js
* jadecoder.js
* unihandecode.js

Now create a ``Unihandecoder`` instance for Japanese::

    var u = Unihandecoder('ja');

You can now call ``decode`` on it with a string to transliterate, for example::

    u.decode('ヨナス') // -> 'yonasu'


*******
License
*******

As this is a port of `unihandecode <https://github.com/miurahr/unihandecode>`_,
it preserves the GPL3 license of that libary.
