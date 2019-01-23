// ==UserScript==
// @name         WME GIS Buttons Unlocker
// @namespace    https://github.com/thecre8r/
// @version      2019.01.23.00
// @description  Automatically updates GIS Buttons API key
// @include      https://www.waze.com/editor*
// @include      https://www.waze.com/*/editor*
// @include      https://beta.waze.com/editor*
// @include      https://beta.waze.com/*/editor*
// @exclude      https://www.waze.com/user/editor*
// @author       The_Cre8r
// ==/UserScript==

/* global W */

(function() {
localStorage.gisButtonsApiKey = W.apiKeys.googleMapsApiKey;
})();
