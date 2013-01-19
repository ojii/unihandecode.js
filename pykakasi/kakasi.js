/*
 kakasi.js

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
var kakasi = Klass()({
	'__init__': function(self){
		self._conv = {
			'j': J2a(),
			'k': K2a()
		};
	},

	'convert': function(self, text){
		var tmp, t, l;
		var otext = '';
		var i = 0;
		while (true){
			if (i >= text.length){
				break;
			}
			if (self._conv.j.canConvert(text[i])){
				tmp = self._conv.j.convert(text.slice(i));
				t = tmp[0];
				l = tmp[1];
				if (l <= 0){
					i++;
					continue
				}
				i = i + l;
				if (i >= text.length){
					otext = otext + t.toUpperCase();
				} else {
					otext = otext + t.toUpperCase() + ' ';
				}
			} else if (self._conv.k.canConvert(text[i])){
				while (true){
					tmp = self._conv.k.convert(text.slice(i));
					t = tmp[0];
					l = tmp[1];
					otext = otext + t;
					i++;
					if (i >= text.length){
						break;
					} else if (!self._conv.k.canConvert(text[i])){
						otext = otext + ' ';
						break;
					}
				}
			} else {
				otext = otext + text[i];
				i++;
			}
		}
		return otext;
	}
});
