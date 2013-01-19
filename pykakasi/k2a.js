/*
 k2a.js

 Copyright 2013 Jonas Obrist <ojiidotch@gmail.com>

 Original Copyright: Copyright 2011 Hiroshi Miura <miurahr@linux.com>

 Original copyright:
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

var K2a = Klass()({
	'_kanadict': KANADICT2,

	'canConvert': function(self, c){
		return (0x3040 < c.charCodeAt(0) && c.charCodeAt(0) < 0x30ff);
	},

	'convert': function(self, text){
		var Hstr = '';
		var max_len = -1;
		var r = PY_MIN(self._kanadict.maxkeylen, text.length);
		for (var x = 1; x <= r; x++){
			if (self._kanadict.haskey(text.slice(0, x))){
				if (max_len < x){
					max_len = x;
					Hstr = self._kanadict[text.slice(0, x)];
				}
			}
		}
		return [Hstr, max_len];
	}
});
