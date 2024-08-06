// ==UserScript==
// @name         Open AliExpress Links in Same Tab
// @namespace    https://github.com/thecre8r/
// @version      2024.08.06.01
// @description  Change target="_blank" to target="_self" on AliExpress to open links in the same tab
// @author       The_Cre8r
// @match        https://*.aliexpress.us/*
// @match        https://*.aliexpress.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to update target attribute on links
    function updateLinks() {
        const links = document.querySelectorAll('a[target="_blank"]');
        links.forEach(link => {
            link.setAttribute('target', '_self');
        });
    }

    // Initial update of links on page load
    document.addEventListener('DOMContentLoaded', updateLinks);

    // MutationObserver to monitor DOM changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                updateLinks();
            }
        });
    });

    // Observe the entire document for added nodes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
