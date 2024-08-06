// ==UserScript==
// @name         Amazon URL Cleaner
// @namespace    https://github.com/thecre8r/
// @version      2024.08.06.01
// @description  Removes unnecessary parameters from Amazon URLs
// @author       The_Cre8r
// @match        *://*.amazon.com/*
// @match        *://*.amazon.co.uk/*
// @run-at       document-start
// ==/UserScript==

function whenReady() {
    return new Promise((resolve) => {
        function completed() {
            document.removeEventListener('DOMContentLoaded', completed);
            window.removeEventListener('load', completed);
            resolve();
        }

        if (document.readyState === 'complete'
            || document.readyState === 'interactive') {
            resolve();
        } else {
            document.addEventListener('DOMContentLoaded', completed);
            window.addEventListener('load', completed);
        }
    });
}

whenReady().then(() => {

    let reg = /((?:https?:)?\/\/(?:\w+\.)?amazon\.(?:com|co\.uk)\/(?:[^\/]+\/dp\/|dp\/|gp\/product\/)([A-Z0-9]{10}))(?:[\/?].*)?/i;

    function toCanonical(original) {
        let match = original.match(reg);
        if (match) {
            return match[1];
        }
        return null;
    }

    // For current tab URL.
    let canonical = toCanonical(window.location.href);
    if (!canonical) {
        let link = document.querySelector('head > link[rel=canonical]');
        if (link) {
            canonical = toCanonical(link.href + window.location.hash);
        }
    }
    if (canonical) {
        window.history.replaceState(history.state, document.title, canonical);
    }

    // For static html links.
    document.querySelectorAll('a').forEach((e) => {
        let canonical = toCanonical(e.href);
        if (canonical) {
            e.href = canonical;
        }
    });

    // For lazy-loaded links.
    let observer = new MutationObserver(function (mutationsList) {
        for (let i = 0; i < mutationsList.length; i++) {
            const mutation = mutationsList[i];
            const addedNodes = mutation.addedNodes;
            for (let j = 0; j < addedNodes.length; j++) {
                cleanAndTraverse(addedNodes[j]);
            }
            if (mutation.type === 'attributes') {
                cleanNodeHref(mutation.target)
            }
        }
    });

    function cleanAndTraverse(root) {
        cleanNodeHref(root);
        let children = root.children;
        if (children) {
            for (let k = 0; k < children.length; k++) {
                cleanAndTraverse(children[k]);
            }
        }
    }

    function cleanNodeHref(elem) {
        if (elem.tagName === 'A') {
            const original = elem.href;
            const canonical = toCanonical(elem.href);
            if (canonical && original !== canonical) {
                elem.href = canonical;
            }
        }
    }

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['href']
    });
});
