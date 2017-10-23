/**
 * Created by cw on 2017/10/23.
 */
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

function send(message) {
    console.log("send Message", message);
}

export function initObserver() {
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
}