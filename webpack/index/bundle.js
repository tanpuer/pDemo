/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.extend = extend;
exports.clone = clone;
exports.delve = delve;
exports.isFunction = isFunction;
exports.isString = isString;
exports.hashToClassName = hashToClassName;
/** Copy own-properties from `props` onto `obj`.
 *	@returns obj
 *	@private
 */
function extend(obj, props) {
	if (props) {
		for (var i in props) {
			obj[i] = props[i];
		}
	}
	return obj;
}

/** Fast clone. Note: does not filter out non-own properties.
 *	@see https://esbench.com/bench/56baa34f45df6895002e03b6
 */
function clone(obj) {
	return extend({}, obj);
}

/** Get a deep property value from the given object, expressed in dot-notation.
 *	@private
 */
function delve(obj, key) {
	for (var p = key.split('.'), i = 0; i < p.length && obj; i++) {
		obj = obj[p[i]];
	}
	return obj;
}

/** @private is the given object a Function? */
function isFunction(obj) {
	return 'function' === typeof obj;
}

/** @private is the given object a String? */
function isString(obj) {
	return 'string' === typeof obj;
}

/** Convert a hashmap of CSS classes to a space-delimited className string
 *	@private
 */
function hashToClassName(c) {
	var str = '';
	for (var prop in c) {
		if (c[prop]) {
			if (str) str += ' ';
			str += prop;
		}
	}
	return str;
}

/** Just a memoized String#toLowerCase */
var lcCache = {};
var toLowerCase = exports.toLowerCase = function toLowerCase(s) {
	return lcCache[s] || (lcCache[s] = s.toLowerCase());
};

/** Call a function asynchronously, as soon as possible.
 *	@param {Function} callback
 */
var resolved = typeof Promise !== 'undefined' && Promise.resolve();
var defer = exports.defer = setTimeout;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/** Global options
 *	@public
 *	@namespace options {Object}
 */
exports.default = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// render modes

var NO_RENDER = exports.NO_RENDER = 0;
var SYNC_RENDER = exports.SYNC_RENDER = 1;
var FORCE_RENDER = exports.FORCE_RENDER = 2;
var ASYNC_RENDER = exports.ASYNC_RENDER = 3;

var EMPTY = exports.EMPTY = {};

var ATTR_KEY = exports.ATTR_KEY = typeof Symbol !== 'undefined' ? Symbol.for('preactattr') : '__preactattr_';

// DOM properties that should NOT have "px" added when numeric
var NON_DIMENSION_PROPS = exports.NON_DIMENSION_PROPS = {
	boxFlex: 1, boxFlexGroup: 1, columnCount: 1, fillOpacity: 1, flex: 1, flexGrow: 1,
	flexPositive: 1, flexShrink: 1, flexNegative: 1, fontWeight: 1, lineClamp: 1, lineHeight: 1,
	opacity: 1, order: 1, orphans: 1, strokeOpacity: 1, widows: 1, zIndex: 1, zoom: 1
};

// DOM event types that do not bubble and should be attached via useCapture
var NON_BUBBLING_EVENTS = exports.NON_BUBBLING_EVENTS = { blur: 1, error: 1, focus: 1, load: 1, resize: 1, scroll: 1 };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.removeNode = removeNode;
exports.setAccessor = setAccessor;

var _constants = __webpack_require__(3);

var _options = __webpack_require__(1);

var _options2 = _interopRequireDefault(_options);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Removes a given DOM Node from its parent. */
function removeNode(node) {
	var p = node.parentNode;
	if (p) p.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} value		An attribute value, such as a function to be used as an event handler
 *	@param {any} previousValue	The last value that was set for this name/node pair
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {

	if (name === 'className') name = 'class';

	if (name === 'class' && value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
		value = (0, _util.hashToClassName)(value);
	}

	if (name === 'key') {
		// ignore
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || (0, _util.isString)(value) || (0, _util.isString)(old)) {
			node.style.cssText = value || '';
		}
		if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
			if (!(0, _util.isString)(old)) {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var _i in value) {
				node.style[_i] = typeof value[_i] === 'number' && !_constants.NON_DIMENSION_PROPS[_i] ? value[_i] + 'px' : value[_i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		node.innerHTML = value && value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var l = node._listeners || (node._listeners = {});
		name = (0, _util.toLowerCase)(name.substring(2));
		// @TODO: this might be worth it later, un-breaks focus/blur bubbling in IE9:
		// if (node.attachEvent) name = name=='focus'?'focusin':name=='blur'?'focusout':name;
		if (value) {
			if (!l[name]) node.addEventListener(name, eventProxy, !!_constants.NON_BUBBLING_EVENTS[name]);
		} else if (l[name]) {
			node.removeEventListener(name, eventProxy, !!_constants.NON_BUBBLING_EVENTS[name]);
		}
		l[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name.match(/^xlink\:?(.+)/);
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', (0, _util.toLowerCase)(ns[1]));else node.removeAttribute(name);
		} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' && !(0, _util.isFunction)(value)) {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', (0, _util.toLowerCase)(ns[1]), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](_options2.default.event && _options2.default.event(e) || e);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.enqueueRender = enqueueRender;
exports.rerender = rerender;

var _options = __webpack_require__(1);

var _options2 = _interopRequireDefault(_options);

var _util = __webpack_require__(0);

var _component = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Managed queue of dirty components to be re-rendered */

// items/itemsOffline swap on each rerender() call (just a simple pool technique)
var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		// (options.debounceRendering || defer)(rerender);
		setTimeout(rerender(), 0);
	}
}

function rerender() {
	var p = void 0,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) (0, _component.renderComponent)(p);
	}
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setComponentProps = setComponentProps;
exports.renderComponent = renderComponent;
exports.buildComponentFromVNode = buildComponentFromVNode;
exports.unmountComponent = unmountComponent;

var _constants = __webpack_require__(3);

var _options = __webpack_require__(1);

var _options2 = _interopRequireDefault(_options);

var _util = __webpack_require__(0);

var _renderQueue = __webpack_require__(5);

var _index = __webpack_require__(8);

var _diff = __webpack_require__(12);

var _functionalComponent = __webpack_require__(7);

var _componentRecycler = __webpack_require__(23);

var _index2 = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== _constants.NO_RENDER) {
		if (opts === _constants.SYNC_RENDER || _options2.default.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, _constants.SYNC_RENDER, mountAll);
		} else {
			(0, _renderQueue.enqueueRender)(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	console.log("renderComponent");
	if (component._disable) return;

	var skip = void 0,
	    rendered = void 0,
	    props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    inst = void 0,
	    cbase = void 0;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== _constants.FORCE_RENDER && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		if (component.render) rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = (0, _util.extend)((0, _util.clone)(context), component.getChildContext());
		}

		while ((0, _functionalComponent.isFunctionalComponent)(rendered)) {
			rendered = (0, _functionalComponent.buildFunctionalComponent)(rendered, context);
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount = void 0,
		    base = void 0;

		if ((0, _util.isFunction)(childComponent)) {
			// set up high order component link

			var childProps = (0, _index.getNodeProps)(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, _constants.SYNC_RENDER, context);
			} else {
				toUnmount = inst;

				inst = (0, _componentRecycler.createComponent)(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				component._component = inst;
				setComponentProps(inst, childProps, _constants.NO_RENDER, context);
				renderComponent(inst, _constants.SYNC_RENDER, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === _constants.SYNC_RENDER) {
				if (cbase) cbase._component = null;
				base = (0, _diff.diff)(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);
				if (!toUnmount) {
					initialBase._component = null;
					(0, _diff.recollectNodeTree)(initialBase);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount, base !== initialBase);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		_diff.mounts.unshift(component);
	} else if (!skip) {
		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (_options2.default.afterUpdate) _options2.default.afterUpdate(component);
	}

	var cb = component._renderCallbacks,
	    fn = void 0;
	if (cb) while (fn = cb.pop()) {
		fn.call(component);
	}console.log("renderComponent - finish");
	if (!_diff.diffLevel && !isChild) (0, _diff.flushMounts)();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = (0, _index.getNodeProps)(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, _constants.ASYNC_RENDER, context, mountAll);
		dom = c.base;
	} else {
		if (c && !isDirectOwner) {
			unmountComponent(c, true);
			dom = oldDom = null;
		}

		c = (0, _componentRecycler.createComponent)(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L241:
			oldDom = null;
		}
		setComponentProps(c, props, _constants.SYNC_RENDER, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			(0, _diff.recollectNodeTree)(oldDom);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Element} dom			A DOM node from which to unmount the given Component
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component, remove) {
	if (_options2.default.beforeUnmount) _options2.default.beforeUnmount(component);

	// console.log(`${remove?'Removing':'Unmounting'} component: ${component.constructor.name}`);
	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner, remove);
	} else if (base) {
		if (base[_constants.ATTR_KEY] && base[_constants.ATTR_KEY].ref) base[_constants.ATTR_KEY].ref(null);

		component.nextBase = base;

		if (remove) {
			(0, _index2.removeNode)(base);
			(0, _componentRecycler.collectComponent)(component);
		}
		var c = void 0;
		while (c = base.lastChild) {
			(0, _diff.recollectNodeTree)(c, !remove);
		} // removeOrphanedChildren(base.childNodes, true);
	}

	if (component.__ref) component.__ref(null);
	if (component.componentDidUnmount) component.componentDidUnmount();
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunctionalComponent = isFunctionalComponent;
exports.buildFunctionalComponent = buildFunctionalComponent;

var _constants = __webpack_require__(3);

var _index = __webpack_require__(8);

var _util = __webpack_require__(0);

/** Check if a VNode is a reference to a stateless functional component.
 *	A function component is represented as a VNode whose `nodeName` property is a reference to a function.
 *	If that function is not a Component (ie, has no `.render()` method on a prototype), it is considered a stateless functional component.
 *	@param {VNode} vnode	A VNode
 *	@private
 */
function isFunctionalComponent(vnode) {
  var nodeName = vnode && vnode.nodeName;
  return nodeName && (0, _util.isFunction)(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
}

/** Construct a resultant VNode from a VNode referencing a stateless functional component.
 *	@param {VNode} vnode	A VNode with a `nodeName` property that is a reference to a function.
 *	@private
 */
function buildFunctionalComponent(vnode, context) {
  return vnode.nodeName((0, _index.getNodeProps)(vnode), context || _constants.EMPTY);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isSameNodeType = isSameNodeType;
exports.isNamedNode = isNamedNode;
exports.getNodeProps = getNodeProps;

var _util = __webpack_require__(0);

var _functionalComponent = __webpack_require__(7);

/** Check if two nodes are equivalent.
 *	@param {Element} node
 *	@param {VNode} vnode
 *	@private
 */
function isSameNodeType(node, vnode) {
	if ((0, _util.isString)(vnode)) {
		return node instanceof Text;
	}
	if ((0, _util.isString)(vnode.nodeName)) {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	if ((0, _util.isFunction)(vnode.nodeName)) {
		return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : true) || (0, _functionalComponent.isFunctionalComponent)(vnode);
	}
}

function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || (0, _util.toLowerCase)(node.nodeName) === (0, _util.toLowerCase)(nodeName);
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
	var props = (0, _util.clone)(vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.options = exports.rerender = exports.render = exports.Component = exports.cloneElement = exports.h = undefined;

var _h = __webpack_require__(11);

var _cloneElement = __webpack_require__(18);

var _component = __webpack_require__(10);

var _render = __webpack_require__(21);

var _renderQueue = __webpack_require__(5);

var _options = __webpack_require__(1);

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	h: _h.h,
	cloneElement: _cloneElement.cloneElement,
	Component: _component.Component,
	render: _render.render,
	rerender: _renderQueue.rerender,
	options: _options2.default
};
exports.h = _h.h;
exports.cloneElement = _cloneElement.cloneElement;
exports.Component = _component.Component;
exports.render = _render.render;
exports.rerender = _renderQueue.rerender;
exports.options = _options2.default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Component = Component;

var _constants = __webpack_require__(3);

var _util = __webpack_require__(0);

var _linkedState = __webpack_require__(20);

var _component = __webpack_require__(6);

var _renderQueue = __webpack_require__(5);

/** Base Component class, for he ES6 Class method of creating Components
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	/** @private */
	this._dirty = true;
	// /** @public */
	// this._disableRendering = false;
	// /** @public */
	// this.prevState = this.prevProps = this.prevContext = this.base = this.nextBase = this._parentComponent = this._component = this.__ref = this.__key = this._linkedStates = this._renderCallbacks = null;
	/** @public */
	this.context = context;
	/** @type {object} */
	this.props = props;
	/** @type {object} */
	if (!this.state) this.state = {};
}

(0, _util.extend)(Component.prototype, {

	/** Returns a `boolean` value indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */
	// shouldComponentUpdate() {
	// 	return true;
	// },


	/** Returns a function that sets a state property when called.
  *	Calling linkState() repeatedly with the same arguments returns a cached link function.
  *
  *	Provides some built-in special cases:
  *		- Checkboxes and radio buttons link their boolean `checked` value
  *		- Inputs automatically link their `value` property
  *		- Event paths fall back to any associated Component if not found on an element
  *		- If linked value is a function, will invoke it and use the result
  *
  *	@param {string} key				The path to set - can be a dot-notated deep key
  *	@param {string} [eventPath]		If set, attempts to find the new state value at a given dot-notated path within the object passed to the linkedState setter.
  *	@returns {function} linkStateSetter(e)
  *
  *	@example Update a "text" state value when an input changes:
  *		<input onChange={ this.linkState('text') } />
  *
  *	@example Set a deep state value on click
  *		<button onClick={ this.linkState('touch.coords', 'touches.0') }>Tap</button
  */
	linkState: function linkState(key, eventPath) {
		var c = this._linkedStates || (this._linkedStates = {});
		return c[key + eventPath] || (c[key + eventPath] = (0, _linkedState.createLinkedState)(this, key, eventPath));
	},


	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = (0, _util.clone)(s);
		(0, _util.extend)(s, (0, _util.isFunction)(state) ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		(0, _renderQueue.enqueueRender)(this);
	},


	/** Immediately perform a synchronous re-render of the component.
  *	@private
  */
	forceUpdate: function forceUpdate() {
		(0, _component.renderComponent)(this, _constants.FORCE_RENDER);
	},


	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.h = h;

var _vnode = __webpack_require__(24);

var _options = __webpack_require__(1);

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stack = [];

/** JSX/hyperscript reviver
*	Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *	@see http://jasonformat.com/wtf-is-jsx
 *	@public
 *  @example
 *  /** @jsx h *\/
 *  import { render, h } from 'preact';
 *  render(<span>foo</span>, document.body);
 */
function h(nodeName, attributes) {
	var children = [],
	    lastSimple = void 0,
	    child = void 0,
	    simple = void 0,
	    i = void 0;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) instanceof Array) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else if (child != null && child !== false) {
			if (typeof child == 'number' || child === true) child = String(child);
			simple = typeof child == 'string';
			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else {
				children.push(child);
				lastSimple = simple;
			}
		}
	}

	var p = new _vnode.VNode(nodeName, attributes || undefined, children);

	// if a "vnode hook" is defined, pass every created VNode to it
	if (_options2.default.vnode) _options2.default.vnode(p);

	return p;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.diffLevel = exports.mounts = undefined;
exports.flushMounts = flushMounts;
exports.diff = diff;
exports.recollectNodeTree = recollectNodeTree;

var _constants = __webpack_require__(3);

var _util = __webpack_require__(0);

var _index = __webpack_require__(8);

var _functionalComponent = __webpack_require__(7);

var _component = __webpack_require__(6);

var _index2 = __webpack_require__(4);

var _recycler = __webpack_require__(19);

var _options = __webpack_require__(1);

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = exports.mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = exports.diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c = void 0;
	while (c = mounts.pop()) {
		if (_options2.default.afterMount) _options2.default.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!(exports.diffLevel = diffLevel += 1, diffLevel - 1)) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent instanceof SVGElement;

		// hydration is inidicated by the existing element to be diffed not having a prop cache
		hydrating = dom && !(_constants.ATTR_KEY in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll);

	// append the element if its a new parent
	if (parent == null) {
		console.log("appendChild", "null");
	}
	if (parent && ret.parentNode !== parent) {
		parent.appendChild(ret);
	}

	// diffLevel being reduced to 0 means we're exiting the diff
	if (!(exports.diffLevel = diffLevel -= 1)) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	console.log("diff res", ret);
	return ret;
}

function idiff(dom, vnode, context, mountAll) {
	var originalAttributes = vnode && vnode.attributes;

	// Resolve ephemeral Pure Functional Components
	while ((0, _functionalComponent.isFunctionalComponent)(vnode)) {
		vnode = (0, _functionalComponent.buildFunctionalComponent)(vnode, context);
	}

	// empty values (null & undefined) render as empty Text nodes
	if (vnode == null) vnode = '';

	// Fast case: Strings create/update Text nodes.
	if ((0, _util.isString)(vnode)) {
		// update if it's already a Text node
		if (dom && dom instanceof Text) {
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			if (dom) recollectNodeTree(dom);
			dom = window._document.createTextNode(vnode);
		}

		// Mark for non-hydration updates
		dom[_constants.ATTR_KEY] = true;
		return dom;
	}

	// If the VNode represents a Component, perform a component diff.
	if ((0, _util.isFunction)(vnode.nodeName)) {
		return (0, _component.buildComponentFromVNode)(dom, vnode, context, mountAll);
	}

	var out = dom,
	    nodeName = String(vnode.nodeName),
	    // @TODO this masks undefined component errors as `<undefined>`
	prevSvgMode = isSvgMode,
	    vchildren = vnode.children;

	// SVGs have special namespace stuff.
	// This tracks entering and exiting that namespace when descending through the tree.
	isSvgMode = nodeName === 'svg' ? true : nodeName === 'foreignObject' ? false : isSvgMode;

	if (!dom) {
		// case: we had no element to begin with
		// - create an element to with the nodeName from VNode
		out = (0, _recycler.createNode)(nodeName, isSvgMode);
	} else if (!(0, _index.isNamedNode)(dom, nodeName)) {
		// case: Element and VNode had different nodeNames
		// - need to create the correct Element to match VNode
		// - then migrate children from old to new

		out = (0, _recycler.createNode)(nodeName, isSvgMode);

		// move children into the replacement node
		while (dom.firstChild) {
			out.appendChild(dom.firstChild);
		} // if the previous Element was mounted into the DOM, replace it inline
		if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

		// recycle the old element (skips non-Element node types)
		recollectNodeTree(dom);
	}

	var fc = out.firstChild,
	    props = out[_constants.ATTR_KEY];

	// Attribute Hydration: if there is no prop cache on the element,
	// ...create it and populate it with the element's attributes.
	if (!props) {
		out[_constants.ATTR_KEY] = props = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc && fc instanceof Text && !fc.nextSibling) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc) {
			innerDiffNode(out, vchildren, context, mountAll);
		}

	// invoke original ref (from before resolving Pure Functional Components):
	if (originalAttributes && typeof originalAttributes.ref === 'function') {
		(props.ref = originalAttributes.ref)(out);
	}

	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom		Element whose children should be compared & mutated
 *	@param {Array} vchildren	Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context		Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} moutAll
 */
function innerDiffNode(dom, vchildren, context, mountAll) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren && vchildren.length,
	    j = void 0,
	    c = void 0,
	    vchild = void 0,
	    child = void 0;

	if (len) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child[_constants.ATTR_KEY],
			    key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (hydrating || props) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen) {
		for (var _i = 0; _i < vlen; _i++) {
			vchild = vchildren[_i];
			child = null;

			// if (isFunctionalComponent(vchild)) {
			// 	vchild = buildFunctionalComponent(vchild);
			// }

			// attempt to find a node based on key matching
			var _key = vchild.key;
			if (_key != null) {
				if (keyedLen && _key in keyed) {
					child = keyed[_key];
					keyed[_key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						c = children[j];
						if (c && (0, _index.isSameNodeType)(c, vchild)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			if (child && child !== dom) {
				if (_i >= len) {
					dom.appendChild(child);
				} else if (child !== originalChildren[_i]) {
					if (child === originalChildren[_i + 1]) {
						(0, _index2.removeNode)(originalChildren[_i]);
					}
					dom.insertBefore(child, originalChildren[_i] || null);
				}
			}
		}
	}

	if (keyedLen) {
		for (var _i2 in keyed) {
			if (keyed[_i2]) recollectNodeTree(keyed[_i2]);
		}
	}

	// remove orphaned children
	while (min <= childrenLen) {
		child = children[childrenLen--];
		if (child) recollectNodeTree(child);
	}
}

/** Recursively recycle (or just unmount) a node an its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		(0, _component.unmountComponent)(component, !unmountOnly);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node[_constants.ATTR_KEY] && node[_constants.ATTR_KEY].ref) node[_constants.ATTR_KEY].ref(null);

		if (!unmountOnly) {
			(0, _recycler.collectNode)(node);
		}

		// Recollect/unmount all children.
		// - we use .lastChild here because it causes less reflow than .firstChild
		// - it's also cheaper than accessing the .childNodes Live NodeList
		var c = void 0;
		while (c = node.lastChild) {
			recollectNodeTree(c, unmountOnly);
		}
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	// remove attributes no longer present on the vnode by setting them to undefined
	for (var name in old) {
		if (!(attrs && name in attrs) && old[name] != null) {
			(0, _index2.setAccessor)(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	if (attrs) {
		for (var _name in attrs) {
			if (_name !== 'children' && _name !== 'innerHTML' && (!(_name in old) || attrs[_name] !== (_name === 'value' || _name === 'checked' ? dom[_name] : old[_name]))) {
				(0, _index2.setAccessor)(dom, _name, old[_name], old[_name] = attrs[_name], isSvgMode);
			}
		}
	}
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by cw on 2017/10/20.
 */
var inQiyiWeb = exports.inQiyiWeb = typeof window !== 'undefined';
var inQiyiApp = exports.inQiyiApp = typeof global !== 'undefined' && global.__base__;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postPatch = postPatch;

var _env = __webpack_require__(13);

var _webview = __webpack_require__(25);

/**
 * Created by cw on 2017/10/23.
 */

function postPatch(patch) {
    if (_env.inQiyiWeb) {
        (0, _webview.on_receive_patch)(patch);
    } else {
        __base__.postPatch("on_receive_patch(" + JSON.stringify(patch) + ");");
    }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.initObserver = initObserver;
/**
 * Created by cw on 2017/10/23.
 */
// Common browser globals
var url = '/';

// used to create UUIDs for Elements
var COUNTER = 0;

var TO_SANITIZE = ['addedNodes', 'removedNodes', 'nextSibling', 'previousSibling', 'target'];

var PROP_BLACKLIST = ['children', 'parentNode', '__handlers', '_component', '_componentConstructor'];

var NODES = new Map();

function getNode(node) {
    var id = void 0;
    if (node && (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object') id = node.__id;
    if (typeof node === 'string') id = node;
    if (!id) return null;
    if (node.nodeName === 'BODY') return document.body;
    return NODES.get(id);
}

function handleEvent(event) {
    console.log("第一步handleEvent");
    var target = getNode(event.target);
    if (target) {
        event.target = target;
        event.bubbles = true;
        target.dispatchEvent(event);
    }
}

function sanitize(obj) {
    if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return obj;

    if (Array.isArray(obj)) return obj.map(sanitize);

    if (obj instanceof document.defaultView.Node) {
        var id = obj.__id;
        if (!id) {
            id = obj.__id = String(++COUNTER);
        }
        NODES.set(id, obj);
    }

    var out = {};
    for (var i in obj) {
        if (obj.hasOwnProperty(i) && PROP_BLACKLIST.indexOf(i) < 0) {
            out[i] = obj[i];
        }
    }
    if (out.childNodes && out.childNodes.length) {
        out.childNodes = sanitize(out.childNodes);
    }
    return out;
}

function send(message) {
    console.log("send Message", message);
}

function initObserver() {
    new document.MutationObserver(function (mutations) {
        console.log("第四部步MutationObserver" + mutations);
        for (var i = mutations.length; i--;) {
            var mutation = mutations[i];
            for (var j = TO_SANITIZE.length; j--;) {
                var prop = TO_SANITIZE[j];
                mutation[prop] = sanitize(mutation[prop]);
            }
        }
        send({ type: 'MutationRecord', mutations: mutations });
    }).observe(document.body, { subtree: true });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = undom;

var _util = __webpack_require__(22);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 const NODE_TYPES = {
 ELEMENT_NODE: 1,
 ATTRIBUTE_NODE: 2,
 TEXT_NODE: 3,
 CDATA_SECTION_NODE: 4,
 ENTITY_REFERENCE_NODE: 5,
 COMMENT_NODE: 6,
 PROCESSING_INSTRUCTION_NODE: 7,
 DOCUMENT_NODE: 9
 };
 */

/** Create a minimally viable DOM Document
 *	@returns {Document} document
 */
function undom() {
    var observers = [],
        pendingMutations = false;

    var Node = function () {
        function Node(nodeType, nodeName) {
            _classCallCheck(this, Node);

            this.nodeType = nodeType;
            this.nodeName = nodeName;
            this.childNodes = [];
        }

        _createClass(Node, [{
            key: 'appendChild',
            value: function appendChild(child) {
                child.remove();
                child.parentNode = this;
                this.childNodes.push(child);
                if (this.children && child.nodeType === 1) this.children.push(child);
                mutation(this, 'childList', { addedNodes: [child], previousSibling: this.childNodes[this.childNodes.length - 2] });
            }
        }, {
            key: 'insertBefore',
            value: function insertBefore(child, ref) {
                child.remove();
                var i = (0, _util.splice)(this.childNodes, ref, child),
                    ref2 = void 0;
                if (!ref) {
                    this.appendChild(child);
                } else {
                    if (~i && child.nodeType === 1) {
                        while (i < this.childNodes.length && (ref2 = this.childNodes[i]).nodeType !== 1 || ref === child) {
                            i++;
                        }if (ref2) (0, _util.splice)(this.children, ref, child);
                    }
                    mutation(this, 'childList', { addedNodes: [child], nextSibling: ref });
                }
            }
        }, {
            key: 'replaceChild',
            value: function replaceChild(child, ref) {
                if (ref.parentNode === this) {
                    this.insertBefore(child, ref);
                    ref.remove();
                }
            }
        }, {
            key: 'removeChild',
            value: function removeChild(child) {
                var i = (0, _util.splice)(this.childNodes, child);
                if (child.nodeType === 1) (0, _util.splice)(this.children, child);
                mutation(this, 'childList', { removedNodes: [child], previousSibling: this.childNodes[i - 1], nextSibling: this.childNodes[i] });
            }
        }, {
            key: 'remove',
            value: function remove() {
                if (this.parentNode) this.parentNode.removeChild(this);
            }
        }]);

        return Node;
    }();

    var Text = function (_Node) {
        _inherits(Text, _Node);

        function Text(text) {
            _classCallCheck(this, Text);

            // TEXT_NODE
            // this.textContent = this.nodeValue = text;
            var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, 3, '#text'));

            _this.data = text;
            return _this;
        }

        _createClass(Text, [{
            key: 'textContent',
            get: function get() {
                return this.data;
            },
            set: function set(value) {
                var oldValue = this.data;
                this.data = value;
                mutation(this, 'characterData', { oldValue: oldValue });
            }
        }, {
            key: 'nodeValue',
            get: function get() {
                return this.data;
            },
            set: function set(value) {
                this.textContent = value;
            }
        }]);

        return Text;
    }(Node);

    var Element = function (_Node2) {
        _inherits(Element, _Node2);

        function Element(nodeType, nodeName) {
            _classCallCheck(this, Element);

            // ELEMENT_NODE
            var _this2 = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this, nodeType || 1, nodeName));

            _this2.attributes = [];
            _this2.children = [];
            _this2.__handlers = {};
            _this2.style = {};
            Object.defineProperty(_this2, 'className', {
                set: function set(val) {
                    _this2.setAttribute('class', val);
                },
                get: function get() {
                    return _this2.getAttribute('style');
                }
            });
            Object.defineProperty(_this2.style, 'cssText', {
                set: function set(val) {
                    _this2.setAttribute('style', val);
                },
                get: function get() {
                    return _this2.getAttribute('style');
                }
            });
            return _this2;
        }

        _createClass(Element, [{
            key: 'setAttribute',
            value: function setAttribute(key, value) {
                this.setAttributeNS(null, key, value);
            }
        }, {
            key: 'getAttribute',
            value: function getAttribute(key) {
                return this.getAttributeNS(null, key);
            }
        }, {
            key: 'removeAttribute',
            value: function removeAttribute(key) {
                this.removeAttributeNS(null, key);
            }
        }, {
            key: 'setAttributeNS',
            value: function setAttributeNS(ns, name, value) {
                var attr = (0, _util.findWhere)(this.attributes, (0, _util.createAttributeFilter)(ns, name)),
                    oldValue = attr && attr.value;
                if (!attr) this.attributes.push(attr = { ns: ns, name: name });
                attr.value = String(value);
                mutation(this, 'attributes', { attributeName: name, attributeNamespace: ns, oldValue: oldValue });
            }
        }, {
            key: 'getAttributeNS',
            value: function getAttributeNS(ns, name) {
                var attr = (0, _util.findWhere)(this.attributes, (0, _util.createAttributeFilter)(ns, name));
                return attr && attr.value;
            }
        }, {
            key: 'removeAttributeNS',
            value: function removeAttributeNS(ns, name) {
                (0, _util.splice)(this.attributes, (0, _util.createAttributeFilter)(ns, name));
                mutation(this, 'attributes', { attributeName: name, attributeNamespace: ns, oldValue: this.getAttributeNS(ns, name) });
            }
        }, {
            key: 'addEventListener',
            value: function addEventListener(type, handler) {
                (this.__handlers[(0, _util.toLower)(type)] || (this.__handlers[(0, _util.toLower)(type)] = [])).push(handler);
            }
        }, {
            key: 'removeEventListener',
            value: function removeEventListener(type, handler) {
                (0, _util.splice)(this.__handlers[(0, _util.toLower)(type)], handler, 0, true);
            }
        }, {
            key: 'dispatchEvent',
            value: function dispatchEvent(event) {
                console.log("第二步dispatchEvent");
                var t = event.currentTarget = this,
                    c = event.cancelable,
                    l = void 0,
                    i = void 0;
                do {
                    l = t.__handlers && t.__handlers[(0, _util.toLower)(event.type)];
                    if (l) for (i = l.length; i--;) {
                        console.log("dispatchEvent", l[i]);
                        console.log("第三步call");
                        if ((l[i].call(t, event) === false || event._end) && c) break;
                    }
                } while (event.bubbles && !(c && event._stop) && (event.target = t = t.parentNode));
                return !event.defaultPrevented;
            }
        }]);

        return Element;
    }(Node);

    var SVGElement = function (_Element) {
        _inherits(SVGElement, _Element);

        function SVGElement() {
            _classCallCheck(this, SVGElement);

            return _possibleConstructorReturn(this, (SVGElement.__proto__ || Object.getPrototypeOf(SVGElement)).apply(this, arguments));
        }

        return SVGElement;
    }(Element);

    var Document = function (_Element2) {
        _inherits(Document, _Element2);

        function Document() {
            _classCallCheck(this, Document);

            return _possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).call(this, 9, '#document')); // DOCUMENT_NODE
        }

        return Document;
    }(Element);

    var Event = function () {
        function Event(type, opts) {
            _classCallCheck(this, Event);

            this.type = type;
            this.bubbles = !!opts.bubbles;
            this.cancelable = !!opts.cancelable;
        }

        _createClass(Event, [{
            key: 'stopPropagation',
            value: function stopPropagation() {
                this._stop = true;
            }
        }, {
            key: 'stopImmediatePropagation',
            value: function stopImmediatePropagation() {
                this._end = this._stop = true;
            }
        }, {
            key: 'preventDefault',
            value: function preventDefault() {
                this.defaultPrevented = true;
            }
        }]);

        return Event;
    }();

    function mutation(target, type, record) {
        record.target = target;
        record.type = type;

        for (var i = observers.length; i--;) {
            var ob = observers[i],
                match = target === ob._target;
            if (!match && ob._options.subtree) {
                do {
                    if (match = target === ob._target) break;
                } while (target = target.parentNode);
            }
            if (match) {
                ob._records.push(record);
                if (!pendingMutations) {
                    pendingMutations = true;
                    // setImmediate(flushMutations);
                    setTimeout(function () {
                        return flushMutations();
                    }, 0);
                }
            }
        }
    }

    function flushMutations() {
        pendingMutations = false;
        for (var i = observers.length; i--;) {
            var ob = observers[i];
            if (ob._records.length) {
                ob.callback(ob.takeRecords());
            }
        }
    }

    var MutationObserver = function () {
        function MutationObserver(callback) {
            _classCallCheck(this, MutationObserver);

            this.callback = callback;
            this._records = [];
        }

        _createClass(MutationObserver, [{
            key: 'observe',
            value: function observe(target, options) {
                this.disconnect();
                this._target = target;
                this._options = options || {};
                observers.push(this);
            }
        }, {
            key: 'disconnect',
            value: function disconnect() {
                this._target = null;
                (0, _util.splice)(observers, this);
            }
        }, {
            key: 'takeRecords',
            value: function takeRecords() {
                return this._records.splice(0, this._records.length);
            }
        }]);

        return MutationObserver;
    }();

    function createElement(type) {
        console.log("createElement", type);
        return new Element(null, String(type).toUpperCase());
    }

    function createElementNS(ns, type) {
        var element = createElement(type);
        element.namespace = ns;
        return element;
    }

    function createTextNode(text) {
        return new Text(text);
    }

    function createDocument() {
        var document = new Document();
        (0, _util.assign)(document, document.defaultView = { document: document, MutationObserver: MutationObserver, Document: Document, Node: Node, Text: Text, Element: Element, SVGElement: SVGElement, Event: Event });
        (0, _util.assign)(document, { documentElement: document, createElement: createElement, createElementNS: createElementNS, createTextNode: createTextNode });
        document.appendChild(document.body = createElement('body'));
        return document;
    }

    return createDocument();
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(9);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by cw on 2017/10/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// import { h, Component } from 'preact';
var button = function (_Component) {
    _inherits(button, _Component);

    function button(props) {
        _classCallCheck(this, button);

        var _this = _possibleConstructorReturn(this, (button.__proto__ || Object.getPrototypeOf(button)).call(this, props));

        _this.state = {
            num: 1
        };
        return _this;
    }

    _createClass(button, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            setInterval(function () {
                console.log(_this2.state.num.toString());
                _this2.setState({
                    num: _this2.state.num + 1
                });
            }, 1000);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return (0, _preact.h)(
                "div",
                { style: { width: 200, height: 2000, fontSize: 100 } },
                (0, _preact.h)(
                    "p",
                    { onClick: function onClick() {
                            _this3.setState({
                                num: _this3.state.num + 1 });
                        } },
                    this.state.num
                ),
                (0, _preact.h)(
                    "p",
                    { style: { fontSize: 200, color: "#ff0000", height: 400 },
                        onClick: function onClick() {
                            setTimeout(function () {
                                _this3.setState({
                                    num: _this3.state.num + 1 });
                            }, 2000);
                        } },
                    "11111"
                )
            );
        }
    }]);

    return button;
}(_preact.Component);

exports.default = button;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cloneElement = cloneElement;

var _util = __webpack_require__(0);

var _h = __webpack_require__(11);

function cloneElement(vnode, props) {
	return (0, _h.h)(vnode.nodeName, (0, _util.extend)((0, _util.clone)(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.collectNode = collectNode;
exports.createNode = createNode;

var _util = __webpack_require__(0);

var _index = __webpack_require__(4);

/** DOM node pool, keyed on nodeName. */

var nodes = {};

function collectNode(node) {
	(0, _index.removeNode)(node);

	if (node instanceof Element) {
		node._component = node._componentConstructor = null;

		var name = node.normalizedNodeName || (0, _util.toLowerCase)(node.nodeName);
		(nodes[name] || (nodes[name] = [])).push(node);
	}
}

function createNode(nodeName, isSvg) {
	var name = (0, _util.toLowerCase)(nodeName),
	    node = nodes[name] && nodes[name].pop() || (isSvg ? window._document.createElementNS('http://www.w3.org/2000/svg', nodeName) : window._document.createElement(nodeName));
	node.normalizedNodeName = name;
	return node;
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createLinkedState = createLinkedState;

var _util = __webpack_require__(0);

/** Create an Event handler function that sets a given state property.
 *	@param {Component} component	The component whose state should be updated
 *	@param {string} key				A dot-notated key path to update in the component's state
 *	@param {string} eventPath		A dot-notated key path to the value that should be retrieved from the Event or component
 *	@returns {function} linkedStateHandler
 *	@private
 */
function createLinkedState(component, key, eventPath) {
	var path = key.split('.');
	return function (e) {
		var t = e && e.target || this,
		    state = {},
		    obj = state,
		    v = (0, _util.isString)(eventPath) ? (0, _util.delve)(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e,
		    i = 0;
		for (; i < path.length - 1; i++) {
			obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
		}
		obj[path[i]] = v;
		component.setState(state);
	};
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _diff = __webpack_require__(12);

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
  return (0, _diff.diff)(merge, vnode, {}, false, parent);
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assign = assign;
exports.toLower = toLower;
exports.createAttributeFilter = createAttributeFilter;
exports.splice = splice;
exports.findWhere = findWhere;
/**
 * Created by cw on 2017/10/20.
 */
function assign(obj, props) {
    for (var i in props) {
        obj[i] = props[i];
    } // eslint-disable-line guard-for-in
}

function toLower(str) {
    return String(str).toLowerCase();
}

function createAttributeFilter(ns, name) {
    return function (o) {
        return o.ns === ns && toLower(o.name) === toLower(name);
    };
}

function splice(arr, item, add, byValueOnly) {
    var i = arr ? findWhere(arr, item, true, byValueOnly) : -1;
    if (~i) add ? arr.splice(i, 0, add) : arr.splice(i, 1);
    return i;
}

function findWhere(arr, fn, returnIndex, byValueOnly) {
    var i = arr.length;
    while (i--) {
        if (typeof fn === 'function' && !byValueOnly ? fn(arr[i]) : arr[i] === fn) break;
    }return returnIndex ? i : arr[i];
}

var resolved = typeof Promise !== 'undefined' && Promise.resolve();
var setImmediate = exports.setImmediate = setTimeout;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.collectComponent = collectComponent;
exports.createComponent = createComponent;

var _component = __webpack_require__(10);

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

function collectComponent(component) {
	var name = component.constructor.name,
	    list = components[name];
	if (list) list.push(component);else components[name] = [component];
}

function createComponent(Ctor, props, context) {
	var inst = new Ctor(props, context),
	    list = components[Ctor.name];
	_component.Component.call(inst, props, context);
	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VNode = VNode;
/** Virtual DOM Node */
function VNode(nodeName, attributes, children) {
	/** @type {string|function} */
	this.nodeName = nodeName;

	/** @type {object<string>|undefined} */
	this.attributes = attributes;

	/** @type {array<VNode>|undefined} */
	this.children = children;

	/** Reference to the given key. */
	this.key = attributes && attributes.key;
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.on_receive_patch = on_receive_patch;
/**
 * Created by cw on 2017/10/23.
 */

function on_receive_patch(data) {
    console.log("onMessage", data);
    if (data.type && data.mutations) {
        if (data.type === 'MutationRecord') {
            for (var i = 0; i < data.mutations.length; i++) {
                queueMutation(data.mutations[i]);
            }
        }
    }
}

/** Events that should not be proxied into the Worker's DOM */
//todo 暂时只开放onclick事件
var EVENT_BLACKLIST = 'mousewheel wheel animationstart animationiteration animationend devicemotion deviceorientation deviceorientationabsolute pointerover focus pointerdown touchstart gotpointercapture pointerup lostpointercapture pointerout touchend mouseover mousemove mousedown mouseup blur'.split(' ');

/** Options for global addEventListener */
var EVENT_OPTS = {
    capture: true,
    passive: true
};

/** Sets up a bidirectional DOM Mutation+Event proxy to a Workerized app.
 *	@param {Worker} opts.worker		The WebWorker instance to proxy to.
 */
var NODES = new Map();

/** Returns the real DOM Element corresponding to a serialized Element object. */
function getNode(node) {
    if (!node) return null;
    if (node.nodeName === 'BODY') return document.body;
    return NODES.get(node.__id);
}

// feature-detect support for event listener options
var supportsPassive = false;
try {
    addEventListener('test', null, {
        get passive() {
            supportsPassive = true;
        }
    });
} catch (e) {}

/** Loop over all "on*" event names on Window and set up a proxy handler for each. */
// eslint-disable-next-line guard-for-in
// for (let i in window) {
//     let m = i.substring(2);
//     if (i.substring(0,2)==='on' && i===i.toLowerCase() && EVENT_BLACKLIST.indexOf(m)<0 && (window[i]===null || typeof window[i]==='function')) {
//         addEventListener(m, proxyEvent, supportsPassive ? EVENT_OPTS : true);
//     }
// }


var touch = void 0;

/** Derives {pageX,pageY} coordinates from a mouse or touch event. */
function getTouch(e) {
    var t = e.changedTouches && e.changedTouches[0] || e.touches && e.touches[0] || e;
    return t && { pageX: t.pageX, pageY: t.pageY };
}

/** Forward a DOM Event into the Worker as a message */
function proxyEvent(e) {
    if (e.type === 'click' && touch) return false;

    var event = { type: e.type };
    if (e.target) event.target = e.target.__id;
    // eslint-disable-next-line guard-for-in
    for (var i in e) {
        var v = e[i];
        if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) !== 'object' && typeof v !== 'function' && i !== i.toUpperCase() && !event.hasOwnProperty(i)) {
            event[i] = v;
        }
    }

    if (event.type == "load" || event.type == "pageshow") {
        return;
    } else {
        console.log("worker.postMessage", event.type);
        // worker.postMessage({
        //     type: 'event',
        //     event
        // });
    }

    if (e.type === 'touchstart') {
        touch = getTouch(e);
    } else if (e.type === 'touchend' && touch) {
        var t = getTouch(e);
        if (t) {
            var delta = Math.sqrt(Math.pow(t.pageX - touch.pageX, 2) + Math.pow(t.pageY - touch.pageY, 2));
            if (delta < 10) {
                event.type = 'click';
                // worker.postMessage({ type: 'event', event });
            }
        }
    }
}

/** Create a real DOM Node from a skeleton Object (`{ nodeType, nodeName, attributes, children, data }`)
 *	@example <caption>Text node</caption>
 *		createNode({ nodeType:3, data:'foo' })
 *	@example <caption>Element node</caption>
 *		createNode({ nodeType:1, nodeName:'div', attributes:[{ name:'a', value:'b' }], childNodes:[ ... ] })
 */
function createNode(skel) {
    var node = void 0;
    if (skel.nodeType === 3) {
        node = document.createTextNode(skel.data);
    } else if (skel.nodeType === 1) {
        node = document.createElement(skel.nodeName);
        if (skel.className) {
            node.className = skel.className;
        }
        if (skel.style) {
            for (var i in skel.style) {
                if (skel.style.hasOwnProperty(i)) {
                    node.style[i] = skel.style[i];
                }
            }
        }
        if (skel.attributes) {
            for (var _i = 0; _i < skel.attributes.length; _i++) {
                var a = skel.attributes[_i];
                // @TODO .ns
                node.setAttribute(a.name, a.value);
            }
        }
        if (skel.childNodes) {
            for (var _i2 = 0; _i2 < skel.childNodes.length; _i2++) {
                node.appendChild(createNode(skel.childNodes[_i2]));
            }
        }
    }
    node.__id = skel.__id;
    NODES.set(skel.__id, node);
    return node;
}

/** Apply MutationRecord mutations, keyed by type. */
var MUTATIONS = {
    /** Handles element insertion & deletion */
    childList: function childList(_ref) {
        var target = _ref.target,
            removedNodes = _ref.removedNodes,
            addedNodes = _ref.addedNodes,
            previousSibling = _ref.previousSibling,
            nextSibling = _ref.nextSibling;

        var parent = getNode(target);
        if (removedNodes) {
            for (var i = removedNodes.length; i--;) {
                parent.removeChild(getNode(removedNodes[i]));
            }
        }
        if (addedNodes) {
            for (var _i3 = 0; _i3 < addedNodes.length; _i3++) {
                var newNode = getNode(addedNodes[_i3]);
                if (!newNode) {
                    newNode = createNode(addedNodes[_i3]);
                }
                parent.insertBefore(newNode, nextSibling && getNode(nextSibling) || null);
            }
        }
    },

    /** Handles attribute addition, change, removal */
    attributes: function attributes(_ref2) {
        var target = _ref2.target,
            attributeName = _ref2.attributeName;

        var val = void 0;
        for (var i = target.attributes.length; i--;) {
            var p = target.attributes[i];
            if (p.name === attributeName) {
                val = p.value;
                break;
            }
        }
        getNode(target).setAttribute(attributeName, val);
    },

    /** Handles Text node content changes */
    characterData: function characterData(_ref3) {
        var target = _ref3.target,
            oldValue = _ref3.oldValue;

        getNode(target).nodeValue = target.data;
        // let node = getNode(target);
        // node && (node.nodeValue = target.data);
    }
};

/** Apply a MutationRecord to the DOM */
function applyMutation(mutation) {
    MUTATIONS[mutation.type](mutation);
}

var timer = void 0;

// stores pending DOM changes (MutationRecord objects)
var MUTATION_QUEUE = [];

// Check if an Element is at least partially visible
function isElementInViewport(el, cache) {
    if (el.nodeType === 3) el = el.parentNode;
    var bbox = el.getBoundingClientRect();
    return bbox.bottom >= 0 && bbox.right >= 0 && bbox.top <= (cache.height || (cache.height = window.innerHeight)) && bbox.left <= (cache.width || (cache.width = window.innerWidth));
}

// requestIdleCallback sortof-polyfill
if (!global.requestIdleCallback) {
    var IDLE_TIMEOUT = 10;
    global.requestIdleCallback = function (cb) {
        var start = Date.now();
        setTimeout(function () {
            return cb({
                timeRemaining: function timeRemaining() {
                    return Math.max(0, IDLE_TIMEOUT - (Date.now() - start));
                }
            });
        }, 1);
    };
}

// Attempt to flush & process as many MutationRecords as possible from the queue
function processMutationQueue(deadline) {
    clearTimeout(timer);
    var q = MUTATION_QUEUE,
        start = Date.now(),
        isDeadline = deadline && deadline.timeRemaining,
        cache = {},
        useVis = (document.getElementById('#use-vis') || cache).checked,
        i = void 0;
    for (i = 0; i < q.length; i++) {
        if (isDeadline ? deadline.timeRemaining() <= 0 : Date.now() - start > 1) break;

        var m = q[i];
        console.log("processMutationQueue", m);
        // if the element is offscreen, skip any text or attribute changes:
        if (useVis && (m.type === 'characterData' || m.type === 'attributes')) {
            var target = getNode(m.target);
            if (target && !isElementInViewport(target, cache)) continue;
        }

        // remove mutation from the queue and apply it:
        applyMutation(q.splice(i--, 1)[0]);
    }

    // still remaining work to be done
    if (q.length) doProcessMutationQueue();
}

function doProcessMutationQueue() {
    // requestAnimationFrame(processMutationQueue);
    clearTimeout(timer);
    timer = setTimeout(processMutationQueue, 100);
    requestIdleCallback(processMutationQueue);
}

// Add a MutationRecord to the queue
function queueMutation(mutation) {
    // for single-node updates, merge into pending updates
    if (mutation.type === 'characterData' || mutation.type === 'attributes') {
        for (var i = MUTATION_QUEUE.length; i--;) {
            var m = MUTATION_QUEUE[i];
            // eslint-disable-next-line eqeqeq
            if (m.type == mutation.type && m.target.__id == mutation.target.__id) {
                if (m.type === 'attributes') {
                    MUTATION_QUEUE.splice(i + 1, 0, mutation);
                } else {
                    MUTATION_QUEUE[i] = mutation;
                }
                return;
            }
        }
    }
    if (MUTATION_QUEUE.push(mutation) === 1) {
        doProcessMutationQueue();
    }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by cw on 2017/10/17.
                                                                                                                                                                                                                                                                               */

// import { h, render } from 'preact';


// import undom from '../preact/undom/undom';
// Install a global Document using Undom, a minimal DOM Document implementation.
// let document = undom();
// var global = {}
// for (let i in document.defaultView) if (document.defaultView.hasOwnProperty(i)) {
//     global[i] = document.defaultView[i];
// }

var _preact = __webpack_require__(9);

var _app = __webpack_require__(17);

var _app2 = _interopRequireDefault(_app);

var _env = __webpack_require__(13);

var _observer = __webpack_require__(15);

var _bridge = __webpack_require__(14);

var _undom = __webpack_require__(16);

var _undom2 = _interopRequireDefault(_undom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var document = (0, _undom2.default)();

if (_env.inQiyiWeb) {
    window._document = document;
    window._root = null;
    // global.document = document
    global.MutationObserver = document.defaultView.MutationObserver;
    global.Document = document.defaultView.Document;
    global.Node = document.defaultView.Node;
    global.Text = document.defaultView.Text;
    global.Element = document.defaultView.Element;
    global.SVGElement = document.defaultView.SVGElement;
    global.Event = document.defaultView.Event;
} else {
    global.window = {};
    window._document = document;
    window._root = null;
    global.document = document;
    global.MutationObserver = document.defaultView.MutationObserver;
    global.Document = document.defaultView.Document;
    global.Node = document.defaultView.Node;
    global.Text = document.defaultView.Text;
    global.Element = document.defaultView.Element;
    global.SVGElement = document.defaultView.SVGElement;
    global.Event = document.defaultView.Event;
}
global.__bridge__ = {};

// Common browser globals
var url = '/';

// used to create UUIDs for Elements
var COUNTER = 0;

var TO_SANITIZE = ['addedNodes', 'removedNodes', 'nextSibling', 'previousSibling', 'target'];

var PROP_BLACKLIST = ['children', 'parentNode', '__handlers', '_component', '_componentConstructor'];

var NODES = new Map();

function getNode(node) {
    var id = void 0;
    if (node && (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object') id = node.__id;
    if (typeof node === 'string') id = node;
    if (!id) return null;
    if (node.nodeName === 'BODY') return document.body;
    return NODES.get(id);
}

function handleEvent(event) {
    console.log("第一步handleEvent");
    var target = getNode(event.target);
    if (target) {
        event.target = target;
        event.bubbles = true;
        target.dispatchEvent(event);
    }
}

function sanitize(obj) {
    if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return obj;

    if (Array.isArray(obj)) return obj.map(sanitize);

    if (obj instanceof document.defaultView.Node) {
        var id = obj.__id;
        if (!id) {
            id = obj.__id = String(++COUNTER);
        }
        NODES.set(id, obj);
    }

    var out = {};
    for (var i in obj) {
        if (obj.hasOwnProperty(i) && PROP_BLACKLIST.indexOf(i) < 0) {
            out[i] = obj[i];
        }
    }
    if (out.childNodes && out.childNodes.length) {
        out.childNodes = sanitize(out.childNodes);
    }
    return out;
}

new document.MutationObserver(function (mutations) {
    console.log("第四部步MutationObserver" + mutations);
    for (var i = mutations.length; i--;) {
        var mutation = mutations[i];
        for (var j = TO_SANITIZE.length; j--;) {
            var prop = TO_SANITIZE[j];
            mutation[prop] = sanitize(mutation[prop]);
        }
    }
    send({ type: 'MutationRecord', mutations: mutations });
}).observe(document.body, { subtree: true });

function send(message) {
    console.log("send Message", message);
    (0, _bridge.postPatch)(message);
}

function init() {
    window._root = (0, _preact.render)((0, _preact.h)(_app2.default.default || _app2.default), document.body, window._root);
}

// if (module.hot) module.hot.accept(['./components/app'], init);

init();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })
/******/ ]);