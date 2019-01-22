// ==UserScript==
// @name         WME Toolbox Hider
// @namespace    https://github.com/thecre8r/
// @version      2019.01.22.00
// @description  Hides the toolbox when hovering over toolbar buttons for those of us that like the toolbox on top
// @include      https://www.waze.com/editor*
// @include      https://www.waze.com/*/editor*
// @include      https://beta.waze.com/editor*
// @include      https://beta.waze.com/*/editor*
// @exclude      https://www.waze.com/user/editor*
// @author       The_Cre8r
// ==/UserScript==

/* global W */
/* global OL */
/* ecmaVersion 2017 */
/* global $ */

(function() {
    function log(msg) {
        console.log('WME Toolbox Hider: ', msg);
    }
    function MO() {
        log('MO Ran');
        let TBZ = $('#WMETB_NavBar').css('z-index')
        var targetNode = document.getElementById('edit-buttons');
        var config = { attributes: true, childList: true, subtree: true };
        var callback = function(mutationsList, observer) {
            for(var mutation of mutationsList) {
                if (mutation.type == 'attributes') {
                    if(mutation.target.classList[4] == 'open'){
                        $('#WMETB_NavBar').css('opacity','0');
                        $('#WMETB_NavBar').css('z-index','0');
                    } else {
                        $('#WMETB_NavBar').css('opacity','1');
                        $('#WMETB_NavBar').css('z-index',TBZ);
                    }
                }
            }
        };
        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }
    function bootstrap(tries = 1) {
        log('bootstrap attempt '+ tries);
        if (W && W.map && W.model && $('#WMETB_NavBarSpan').length) {
            MO();
        } else if (tries < 1000) {
            setTimeout(() => bootstrap(tries++), 200);
        }
    }
    bootstrap();
})();
