/*
 j2h.js

 Copyright 2013 Jonas Obrist <ojiidotch@gmail.com>

 Original Copyright: Copyright 2011 Hiroshi Miura <miurahr@linux.com>

 Original Copyright:
 * KAKASI (Kanji Kana Simple inversion program)
 * $Id: jj2.c,v 1.7 2001-04-12 05:57:34 rug Exp $
 * Copyright (C) 1992
 * Hironobu Takahashi (takahasi@tiny.or.jp)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either versions 2, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with KAKASI, see the file COPYING.  If not, write to the Free
 * Software Foundation Inc., 59 Temple Place - Suite 330, Boston, MA
 * 02111-1307, USA.
 */
unihandecode.helpers.module('unihandecode.ja.jskakasi', function(scope){
	scope.J2H = Klass()({
		'_cl_table': [
			"","aiueow", "aiueow", "aiueow", "aiueow", "aiueow", "aiueow", "aiueow",
			"aiueow", "aiueow", "aiueow", "k", "g", "k", "g", "k", "g", "k", "g", "k",
			"g", "s", "zj", "s", "zj", "s", "zj", "s", "zj", "s", "zj", "t", "d", "tc",
			"d", "aiueokstchgzjfdbpw", "t", "d", "t", "d", "t", "d", "n", "n", "n", "n",
			"n", "h", "b", "p", "h", "b", "p", "hf", "b", "p", "h", "b", "p", "h", "b",
			"p", "m", "m", "m", "m", "m", "y", "y", "y", "y", "y", "y", "rl", "rl",
			"rl", "rl", "rl", "wiueo", "wiueo", "wiueo", "wiueo", "w", "n", "v", "k",
			"k", "", "", "", "", "", "", "", "", ""
		],
		'__init__': function(self){
			self._kanwa = unihandecode.ja.jskakasi.kanwa();
		},

		'canConvert': function(self, c){
			return (0x3400 <= c.charCodeAt(0) && c.charCodeAt(0) < 0xfa2e);
		},

		'isCletter': function(self, l, c){
			var ord = c.charCodeAt(0)
			return ((0x3041 <= ord && ord <= 0x309f) && unihandecode.helpers.contains(l, self._cl_table[ord - 0x3040]));
		},

		'itaiji_conv': function(self, text){
			var c;
			var r = [];
			for (var i = 0, l = text.length; i < l; i++){
				c = text[i];
				if (self._kanwa.haskey(c)){
					r.push(c);
				}
			}
			for (var i = 0, l = r.length; i < l; i++){
				text = text.replace(c, self._kanwa.lookup(c));
			}
			return text;
		},

		'convert': function(self, text){
			var v, length, yomi, tail;
			var max_len = 0;
			var Hstr = '';
			var table = self._kanwa.load(text[0]);
			if (!table){
				return ['', 0];
			}
			for (var k in table){
				if (!table.hasOwnProperty(k)){
					continue;
				}
				v = table[k];
				length = k.length;
				if (text.length >= length){
					if (unihandecode.helpers.startswith(text, k)){
						for (var i = 0, l = v.length; i < l; i++){
							yomi = v[i][0];
							tail = v[i][1];
							if (tail.length === 0){
								if (max_len < length){
									Hstr = yomi;
									max_len = length;
								}
							} else if (max_len < length + 1 && text.length > length && self.isCletter(tail, text[length])){
								Hstr = [yomi, text[length]].join('');
								max_len = length + 1;
							}
						};
					}
				}
			}
			return [Hstr, max_len];
		}
	});
});
