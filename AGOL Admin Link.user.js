// ==UserScript==
// @name         AGOL Admin Link
// @namespace    
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      https://*.arcgis.com/*/ArcGIS/rest/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function(){
        let pathname = window.location.href;
        pathname = pathname.replace("rest", "rest\/admin")
        $(".titlecell").append(" | <a href='" + pathname + "'>REST Admin</a>");
    });
})();
