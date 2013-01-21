/*
 j2a.js

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
	scope.J2a = Klass()({
		'__init__': function(self){
			self._jconv = unihandecode.ja.jskakasi.J2H();
			self._kconv = unihandecode.ja.jskakasi.K2a();
		},

		'canConvert': function(self, character){
			return self._jconv.canConvert(character);
		},

		'convert': function(self, text){
			var tmp, t, l, m, otext, s, n;
			tmp = self._jconv.convert(text);
			t = tmp[0];
			l = tmp[1];
			if (l <= 0){
				return ['', 0];
			}
			m = 0;
			otext = '';
			while (true){
				if (m >= t.length){
					break;
				}
				tmp = self._kconv.convert(t.slice(m));
				s = tmp[0];
				n = tmp[1];
				if (n <= 0){
					m++;
				} else {
					m = m + n;
					otext = otext + s;
				}
			}
			return [otext, l];
		}
	});
});
