// ==UserScript==
// @name         Telegraph Herald Subscription Bypass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Ian
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include      http://www.telegraphherald.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $( "#syncronex-cover" ).remove();
    $('p').css("display", "");
})();
