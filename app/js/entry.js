'use strict';

$(function() {

    var inputNumberModule = require('./modules/input-number'),
        sliderOpacitySlider = require('./modules/slider-opacity.js'),
        positionModule = require('./modules/position'),
        imgupload = require('./modules/file-upload.js');

    positionModule.init();
    inputNumberModule.init();
    sliderOpacitySlider.init();
    imgupload.init();

});
