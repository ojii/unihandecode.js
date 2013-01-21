/*
 License: GPL3
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
var unihandecode = unihandecode || {};
unihandecode.helpers = {};
unihandecode.helpers.module = function(name, scope){
	var tmp = {};
	var current = window;
	var bits = name.split('.');
	while (bits.length){
		var name = bits.shift();
		if (!current.hasOwnProperty(name)){
			current[name] = {};
		}
		current = current[name];
	}
	scope(tmp);
	unihandecode.helpers.merge_objects(current, tmp);
}

unihandecode.helpers.merge_objects = function(a, b){
	for (var key in b){
		if (b.hasOwnProperty(key)){
			a[key] = b[key];
		}
	}
};

unihandecode.helpers.startswith = function(s, w){
	return s.indexOf(w) === 0;
};

unihandecode.helpers.min = function(){
	var low = null;
	var val = 0;
	for (var i = 0, l = arguments.length; i < l; i++){
		val = arguments[i];
		if (low === null || val < low){
			low = val;
		}
	}
	return low;
};

unihandecode.helpers.contains = function(needle, haystack){
	return haystack.indexOf(needle) !== -1;
};
