'use strict';

$(function() {

    var inputNumberModule = require('./modules/input-number'),
        sliderOpacitySlider = require('./modules/slider-opacity.js'),
        imgupload = require('./modules/file-upload.js');

    inputNumberModule.init();
    sliderOpacitySlider.init();
    imgupload.init();

});
