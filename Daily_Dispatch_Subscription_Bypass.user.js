// ==UserScript==
// @name         Daily Dispatch Subscription Bypass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Ian
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include      http://www.hendersondispatch.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('.subscription-required').remove();
    $('.subscriber-only').removeClass('hide');
    $('.redacted-overlay').removeAttr('style');
})();
