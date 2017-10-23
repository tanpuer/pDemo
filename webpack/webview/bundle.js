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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
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

/***/ 25:
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

/***/ })

/******/ });