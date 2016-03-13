
'use strict';

$(function() {

    var blocked = require('./modules/block'),
        inputNumberModule = require('./modules/input-number'),
        sliderOpacitySlider = require('./modules/slider-opacity'),
        positionModule = require('./modules/position'),
        imgupload = require('./modules/file-upload'),
        ajax = require('./modules/ajax_sent'),

        appModule = require('./modules/app'),
        chagneLanguage = require('./modules/language-selection'),
        socialSharing = require('./modules/sharing');

    blocked.init();
    positionModule.init();
    inputNumberModule.init();
    sliderOpacitySlider.init();
    imgupload.init();


    appModule.init();
    chagneLanguage.init();
    socialSharing.init();

    
     
});