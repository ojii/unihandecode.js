###
API
###

.. highlight:: js


************
Introduction
************

When trying to understand the code, or if you want to write your own decoder, the first thing you should look at is
:ref:`libs-helpers` and :ref:`libs-klass`. The first file contains the namespacing mechanism which is used throughout
unihandecode.js, and the latter provides the OOP capabilities used in this project.

Note that the Japanese decoder is very different than the other default decoders. So if you want to get started, look
at one of the other decoders first.

APIs and files are documented in the order they should be loaded in.


.. _libraries:

*********
Libraries
*********

The libraries located in ``src/libs`` provide helper functionality used throughout the code. Most notably, this includes
a namespacing helper and a way to do OOP Javascript code that resembles Python classes. The Python-style OOP libary is
used because I'm primarily a Python developer and it makes a lot more sense to me than prototypical inheritance, and
because this is a port of a Python library, so keeping the style similar helped a lot.

.. _libs-helpers:

src/libs/helpers.js
===================


This file **must** be loaded first.


.. js:function:: unihandecode.helpers.module(name, callback)

    Takes a dotted namespace (eg ``'unihandecode.mymodule'`` and a callback function as arguments. The callback function
    will be called with a single argument, ``scope``, which is an object onto which the module should assign all its
    public functions, classes and properties. The callback function has no return value.

    The same namespace can be defined in multiple files and this function will merge them.

    Example::

        unihandecode.helpers.module('unihandecode.math', function(scope){
            scope.add = function(a, b){
                return a + b;
            };
        });


.. js:function:: unihandecode.helpers.merge_objects(base, other)

    Merges two objects adding all attributes on ``other`` onto the ``base`` object. This function has no return value.

.. js:function:: unihandecode.helpers.startswith(string, prefix)

    Returns ``true`` if ``string`` starts with ``prefix``, otherwise returns ``false``.

.. js:function:: unihandecode.helpers.min(*args)

    Returns the lowest number of the arguments given. All arguments should be integers. Returns ``null`` if no arguments
    are given.

.. js:function:: unihandecode.helpers.contains(needle, haystack)

    Returns ``true`` if ``needle`` is found in the ``haystack`` array, otherwise returns ``false``.


.. _libs-klass:

src/libs/klass.js
=================

This file **must** be loaded second.

Vendored version of https://github.com/ojii/klass. Provides Python style OOP for Javascript.


.. js:function:: Klass(*parents)

    Returns a class definition function. Takes any number of Klass class constructors as arguments which will be the
    parent classes of the new class.

    The class definition function returned takes an object of properties and methods as arguments and returns a class
    constructor.

    If the class constructor is called, the special ``__init__`` method is called, so if you want your class to accept
    arguments and handle them during construction, the object you passed into the class definition function should
    provide this method.

    Every method in a Klass class takes the class instance as explicit first argument, which should be called ``self``.
    This means that ``this`` resolution is irrelevant to Klass class instances.

    Each instance of a Klass class has a sepcial method ``$uper`` which the name of a method as string as an argument
    and returns the super method (method from a parent class) for that name.


    Example::

        var BaseClass = Klass()({
            '__init__': function(self, name){
                self.name = name;
            }
        });

        var MyClass = Klass(BaseClass)({
            'greet': function(self){
                return 'Hi ' + self.name;
            }
        });

        var myinstance = MyClass('unihandecode.js');
        console.log(myinstance.greet()); // writes 'Hi unihandecode.js' to console.


.. js:function:: Klass.isinstance(instance, klass)

    Returns ``true`` if ``instance`` is an instance of ``klass`` (or any of the parent classes of ``klass``.


.. js:function:: Klass.issubclass(subklass, klass)

    Returns ``true`` if ``subclass`` is a subclass of ``klass`` (or any of parent classes of `klass``).


.. _base-data:

*********
Base Data
*********

src/base/unicodepoints.js
=========================

Contains the basic Unihan code points used by the various decoders.


.. js:attribute:: unihandecode,base.CODEPOINTS

    Basic codepoints used by the 'zh', 'vn' and 'kr' decoders.


.. _core-api:

********
Core API
********

src/basedecoder.js
==================

Defines the base decoder class which is subclassed by all specific decoders.

.. js:function:: unihandecode.BaseDecoder(debug)

    Base decoder class. When initialized, calls the :js:func:`unihandecode.BaseDecoder.load_codepoints` method which is
    the default entry point for custom decoders.

    .. js:attribute:: unihandecode.BaseDecoder.codepoints

        Object storing the codepoints used to decode text.

        This object maps unicode characters to ASCII text. When a lookup is performed, the character code of the
        character to look up is right shifted by 8 and transformed to a hexidecimal number. This hex number is then
        padded with zeroes (on the left) until it is two characters long. This zero-padded hex code is the key used to
        do the first level lookup in this object. The second level lookup is done by using the character code of the
        lookup character AND'ed by 255 as an index into an array.

        As a result, codepoint objects

    .. js:function:: unihandecode.BaseDecoder.load_codepoints()

        Called during initialization and should populate the :js:attr:`unihandecode.BaseDecoder.codepoints` object.

        Most decoders only need to override this method.

    .. js:function:: unihandecode.BaseDecoder.decode(text)

        The main API of the decoder. This method should transliterate the ``text`` given and return the transliterated
        string.

        By default, this method looks for all unicode objects in the string and calls
        :js:func:`unihandecode.BaseDecoder.replace_point` to replace that character.

    .. js:function:: unihandecode.BaseDecoder.replace_point(character)

        Replaces the ``character`` (a one character string) with an appropriate transliteration, if possible. It does so
        by looking up the transliteration in ``self.codepoints``. The methods
        :js:func:`unihandecode.BaseDecoder.code_group` is used to find the key into ``self.codepoints`` and
        :js:func:`unihandecode.BaseDecoder.grouped_point` is used to find the index into the array found at that key.


    .. js:function:: unihandecode.BaseDecoder.code_group(character)

        Returns the key into ``self.codepoints`` for ``character``. The key is the hex code of the character code of
        ``character`` right shifted by 8 and left-padded with zeros to ensure a key length of two.

    .. js:function:: unihandecode.BaseDecoder.grouped_point(character)

        Returns the index into the array found in ``self.codepoints`` for ``character``. This is done by AND'ing the
        character code of ``character`` with 255.


src/unihandecode.js
===================

This file contains the main public API.


.. js:function:: unihandecode.Unihan(lang, debug=false)

    Returns a ``Unihan`` object which can be used to decode. The ``lang`` argument must be specified and is the name of
    the decoder to be used. The decoder must be previously registered.

    The optional ``debug`` flag can be set to true, to make the decoding fail in case the decoder can't handle a
    specific character. The default behavior in that case is to just ignore that character, but with ``debug`` enabled
    an error will be thrown.

    .. js:function:: unihandecode.Unihan.decode(text)

        Decodes the given string and returns the transliterated version. If ``debug`` is enabled, this may throw errors.


.. js:function:: unihandecode.register_decoder(lang, decoder)

    Registers a decoder (globally). The ``lang`` argument is the same that will be used in
    :js:func:`unihandecode.Unihan`. ``decoder`` should be a subclass of :js:func:`unihandecode.BaseDecoder`.


.. js:function:: unihandecode.unregister_decoder(lang)

    Unregisters a decoder (globally), this is mostly useful for testing.
