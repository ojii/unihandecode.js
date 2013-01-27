/*
 License: GPL3
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
var unihandecode = unihandecode || {};
unihandecode.helpers = {};
unihandecode.helpers.module = function(name, callback){
	var scope = {};
	var current = window;
	var bits = name.split('.');
	while (bits.length){
		var name = bits.shift();
		if (!current.hasOwnProperty(name)){
			current[name] = {};
		}
		current = current[name];
	}
	callback(scope);
	unihandecode.helpers.merge_objects(current, scope);
}

unihandecode.helpers.merge_objects = function(base, other){
	for (var key in other){
		if (other.hasOwnProperty(key)){
			base[key] = other[key];
		}
	}
};

unihandecode.helpers.startswith = function(string, prefix){
	return string.indexOf(prefix) === 0;
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
