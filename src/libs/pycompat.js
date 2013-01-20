/*
 License: GPL3
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
function PY_DICT_UPDATE(a, b){
	for (var key in b){
		if (b.hasOwnProperty(key)){
			a[key] = b[key];
		}
	}
}

function PY_STR_STARTSWITH(s, w){
	return s.indexOf(w) === 0;
}

function PY_MIN(){
	var low = null;
	var val = 0;
	for (var i = 0, l = arguments.length; i < l; i++){
		val = arguments[i];
		if (low === null || val < low){
			low = val;
		}
	}
	return low;
}
