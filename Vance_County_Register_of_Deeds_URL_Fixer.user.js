// ==UserScript==
// @name         Vance County Register of Deeds URL Fixer
// @namespace    https://github.com/thecre8r/
// @version      2022.10.11.01
// @description  None
// @author       The_Cre8r
// @match        https://www.vancencrod.org/BookAndPage.asp*
// @match        https://www.vancencrod.org/DocumentView.asp*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vancencrod.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let obj
    let obj2

    function process() {
        if (onlyLetters(obj.value)) {
            obj2.value = 7
        } else if (parseInt(obj.value) == 1) {
            return;
        } else if (onlyNumbers(obj.value)) {
            obj2.value = 1
        }
    }

    function onlyLetters(str) {
        return Boolean(str.match(/^[A-Za-z]*$/));
    }
    function onlyLettersAndNumbers(str) {
        return Boolean(str.match(/^[A-Za-z0-9]*$/));
    }
    function onlyNumbers(str) {
        return Boolean(str.match(/^[0-9]*$/));
    }
    if (document.location.pathname == '/BookAndPage.asp') {
        obj = document.querySelector("#txtBookNumber")
        obj2 = document.querySelector("#lstDocumentTypes")
        obj.addEventListener("change", process);
    } else {
        document.querySelector("#fraControl").addEventListener('load', function() {
            let searchURL = document.getElementById("fraControl").contentWindow.location.search
            window.history.pushState('page2', 'Title', document.location.origin + document.location.pathname + searchURL);
        });
        obj = document.querySelector("#fraToolBar").contentWindow.document.querySelector("#txtBookNumberV")
        obj2 = document.querySelector("#fraToolBar").contentWindow.document.querySelector("#cboDocumentTypesV")
        obj.addEventListener("change", process);
    }
})();
