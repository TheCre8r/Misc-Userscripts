// ==UserScript==
// @name         Waze Tolls UI Fixer
// @namespace    https://github.com/thecre8r/
// @version      2019.04.08.01
// @description  Presses Login when you hit enter on the password field and automatically presses continue.
// @match        http://waze-tolls-management.appspot.com/welcome.html
// @match        https://waze-tolls-management.appspot.com/welcome.html
// @author       The_Cre8r
// @license      GPLv3
// @grant        none
// ==/UserScript==

/* global $ */

(function() {
    function log(msg) {
        console.log('Waze Tolls UI Fixer: ', msg);
    }
    function Enter() {
        log('Enter Ran');
        var input = document.getElementById("password");
        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.querySelector('#loginDiv > table > tbody > tr:nth-child(3) > td:nth-child(2) > input[type="button"]:nth-child(1)').click();
            }
        });
    }
    function MO() {
        log('MO Ran');
        $('#username').focus();
        let temp;
        var targetNode = document.getElementById('cont');
        var config = { attributes: true, childList: true, subtree: true };
        var callback = function(mutationsList, observer) {
            for(var mutation of mutationsList) {
                let temp = mutation.target.children[0].children[0];
                if (!mutation.target.hidden){
                    temp.click();
                    log('Click Ran');

                }
            }
        };
        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }
    function bootstrap(tries = 1) {
        log('bootstrap attempt '+ tries);
        if ($('#cont')) {
            MO();
            Enter();
        } else if (tries < 1000) {
            setTimeout(() => bootstrap(tries++), 200);
        }
    }
    bootstrap();
})();
