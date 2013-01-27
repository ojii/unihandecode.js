#####
Usage
#####


.. highlight:: html


**********
Quickstart
**********

Include dist/unihandecode-|release|.core.min.js and at least one decoder source file
(dist/unihandecode--|release|.<decoder>.min.js, replacing ``<decoder>`` with the name of your decoder) in your HTML
page.

Call :js:func:`unihandecode.Unihan` with the name of your decoder as first argument (eg ``'ja'`` for Japanese), this
will return an object which has a ``decode`` method that takes a string as argument, and returns the transliterated
string.

Example:

.. parsed-literal::

    <!DOCTYPE html>
    <html>
    <body>
    <script src="dist/unihandecode-|release|.core.min.js"></script>
    <script src="dist/unihandecode-|release|.ja.min.js"></script>
    <script>
        console.log(unihandecode.Unihan('ja').decode('こんにちは')); // writes 'konnichiha' to the console
        });
    </script>
    </body>
    </html>


.. _decoder-list:

****************
List of decoders
****************

* ``'ja'``: Japanese Kanji, Hiragana and Katakana support. Supports combined-kanji and full sentences.
* ``'zh'``: Chinese Kanji.
* ``'kr'``: Korean character support.
* ``'vn'``: Vietnamese character support.
* ``'diacritic'``: Support for diacritics (eg umlauts).


*****************
The Unihan object
*****************

The :js:func:`unihandecode.Unihan` function is your main entry point to unihandecode.js. As described above, the first
argument it takes is the name of the decoder you wish to use. See :ref:`decoder-list` for a list of decoders which are
available by default.

It also takes an optional second argument which, if set to ``true``, will cause the decoder to throw an error if it failed
to decode a character, instead of just skipping that character.

The object returned by :js:func:`unihandecode.Unihan` has a single method, ``decode``, which takes a string as argument
and returns the transliterated string.
