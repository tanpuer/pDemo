/**
 * Created by cw on 2017/10/17.
 */
import { h, render } from '../preact/preact';
// import { h, render } from 'preact';
import App from './component/app';
import {inQiyiWeb, inQiyiApp} from '../preact/env/env';
import {initObserver} from '../preact/undom/observer';
import {postPatch} from '../preact/undom/bridge';

// import undom from '../preact/undom/undom';
// Install a global Document using Undom, a minimal DOM Document implementation.
// let document = undom();
// var global = {}
// for (let i in document.defaultView) if (document.defaultView.hasOwnProperty(i)) {
//     global[i] = document.defaultView[i];
// }

import undom from '../preact/undom/undom';
let document = undom();

if (inQiyiWeb){
    window._document = document;
    window._root = null;
    // global.document = document
    global.MutationObserver = document.defaultView.MutationObserver
    global.Document = document.defaultView.Document
    global.Node = document.defaultView.Node
    global.Text = document.defaultView.Text
    global.Element = document.defaultView.Element
    global.SVGElement = document.defaultView.SVGElement
    global.Event = document.defaultView.Event
}else {
    global.window = {};
    window._document = document;
    window._root = null;
    global.document = document
    global.MutationObserver = document.defaultView.MutationObserver
    global.Document = document.defaultView.Document
    global.Node = document.defaultView.Node
    global.Text = document.defaultView.Text
    global.Element = document.defaultView.Element
    global.SVGElement = document.defaultView.SVGElement
    global.Event = document.defaultView.Event
}

// Common browser globals
let url = '/';

// used to create UUIDs for Elements
let COUNTER = 0;

const TO_SANITIZE = ['addedNodes', 'removedNodes', 'nextSibling', 'previousSibling', 'target'];

const PROP_BLACKLIST = ['children', 'parentNode', '__handlers', '_component', '_componentConstructor' ];

const NODES = new Map();


function getNode(node) {
    let id;
    if (node && typeof node==='object') id = node.__id;
    if (typeof node==='string') id = node;
    if (!id) return null;
    if (node.nodeName==='BODY') return document.body;
    return NODES.get(id);
}


function handleEvent(event) {
    console.log("第一步handleEvent")
    let target = getNode(event.target);
    if (target) {
        event.target = target;
        event.bubbles = true;
        target.dispatchEvent(event);
    }
}


function sanitize(obj) {
    if (!obj || typeof obj!=='object') return obj;

    if (Array.isArray(obj)) return obj.map(sanitize);

    if (obj instanceof document.defaultView.Node) {
        let id = obj.__id;
        if (!id) {
            id = obj.__id = String(++COUNTER);
        }
        NODES.set(id, obj);
    }

    let out = {};
    for (let i in obj) {
        if (obj.hasOwnProperty(i) && PROP_BLACKLIST.indexOf(i)<0) {
            out[i] = obj[i];
        }
    }
    if (out.childNodes && out.childNodes.length) {
        out.childNodes = sanitize(out.childNodes);
    }
    return out;
}

(new document.MutationObserver( mutations => {
    console.log("第四部步MutationObserver" + mutations)
    for (let i=mutations.length; i--; ) {
        let mutation = mutations[i];
        for (let j=TO_SANITIZE.length; j--; ) {
            let prop = TO_SANITIZE[j];
            mutation[prop] = sanitize(mutation[prop]);
        }
    }
    send({ type:'MutationRecord', mutations });
})).observe(document.body, { subtree:true });


function send(message) {
    console.log("send Message", message);
    postPatch(message)
}



function init() {
    window._root = render(h(App.default || App), document.body, window._root);
}

// if (module.hot) module.hot.accept(['./components/app'], init);

init();



