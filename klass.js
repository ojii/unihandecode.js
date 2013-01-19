/*
 License: GPL3
 Copyright: 2013 Jonas Obrist <ojiidotch@gmail.com>
 */
var Klass = (function(){
	var cache = {}; // cache original attrs to class ids
	var children = {}; // cache children of classes
	var counter = 0; // class id counter
	var mixin = function(self, args){
		// mix self into an array of arguments, returns new array of full arguments
		var full_args = [self];
		full_args.push.apply(full_args, args);
		return full_args;
	};
	var find_method = function(name, parents){
		// find a parent ("super") method and return it.
		for (var i=0, l=parents.length; i<l; i++){
			var parent = cache[parents[i].__id__];
			if (parent.hasOwnProperty(name)){
				return parent[name];
			}
		}
		for (var i= 0, l=parents.length; i<l; i++){
			var method = find_method(name, parents[i].__parents__);
			if (method){
				return method;
			}
		}
	};
	var proxy = function(self, real){
		// returns a proxy method for the given 'real' method which will always mix in 'self'.
		return function(){
			var args = mixin(self, arguments);
			return real.apply(this, args);
		};
	};
	var map_attrs = function(self, attrs, parents){
		// map given attributes onto the 'self' object.
		// map main attrs
		for (var attr in attrs){
			if (attrs.hasOwnProperty(attr)){
				if (typeof attrs[attr] === 'function'){
					self[attr] = proxy(self, attrs[attr]);
				} else {
					self[attr] = attrs[attr];
				}
			}
		}
		// map parent attrs
		for (var i=0, l=parents.length; i<l; i++){
			var parent = cache[parents[i].__id__];
			for (var attr in parent){
				if (parent.hasOwnProperty(attr) && !self.hasOwnProperty(attr)){
					if (typeof parent[attr] === 'function'){
						self[attr] = proxy(self, parent[attr]);
					} else {
						self[attr] = parent[attr];
					}
				}
			}
		}
		// map $super
		self.$uper = function(name){
            var method = find_method(name, parents);
            if (method){
                return proxy(self, method);
            } else {
                return null;
            }
		};
		// ensure __init__
		if (!self.hasOwnProperty('__init__')){
			self.__init__ = self.$uper('__init__') || function(){};
		}
	};
	var api = function(){
		var parents = Array.prototype.slice.call(arguments);
		function classdef(attrs){
			// returns a new klass with given attrs and parents
			attrs = attrs || {};
			var klass = function(){
				var self = {};
				map_attrs(self, attrs, parents);
				self.__klass__ = klass;
				self.__init__.apply(this, arguments);
				return self;
			};
			// add "classmethods" (methods that need to be called explicitly with an instance
			for (var attr in attrs){
				if (attrs.hasOwnProperty(attr)){
					klass[attr] = attrs[attr];
				}
			}
			klass.__id__ = ++counter;
			klass.__parents__ = parents;
			children[klass.__id__] = [];
			for (var i=0, l=parents.length; i<l; i++){
				children[parents[i].__id__].push(klass);
			}
			cache[klass.__id__] = attrs;
			return klass;
		}
		return classdef;
	};

	api.isinstance = function(instance, klass){
		// checks if an instance is an instance of the given klass or any of its parent klasses.
		if (!instance.__klass__){
			return false;
		}
		if (instance.__klass__.__id__ === klass.__id__){
			return true;
		}
		for (var i=0, l=children[klass.__id__].length; i<l; i++){
			if (api.isinstance(instance, children[klass.__id__][i])){
				return true;
			}
		}
		return false;
	};
	api.issubclass = function(subklass, klass){
		// checks if a klass is a subclass of another klass (or any of its parent klasses).
		for (var i=0, l=children[klass.__id__].length; i<l; i++){
			var childklass = children[klass.__id__][i];
			if (childklass.__id__ === subklass.__id__){
				return true;
			}
			if (api.issubclass(subklass, childklass)){
				return true;
			}
		}
		return false;
	}
	return api;
})();
