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

    var $display = $('.main__container-picture-display'),
        $posInputX = $('.position__input-x'),
        $posInputY = $('.position__input-y');

    $('.big-img').on('change', function() {

        var $this = $(this),
            $mainImg = $display.find('.main-img');

        if (!$mainImg.length) {
            $mainImg = $('<img class="main-img" src="">');
            $display.append($mainImg);
        }

        $mainImg.attr('src', $this.val());

    });

    $('.small-img').on('change', function() {

        var $this = $(this),
            $watermark = $display.find('.watermark');

        if (!$watermark.length) {
            $watermark = $('<img class="$watermark" src="">');
            $watermark
                .css({
                    'position': 'absolute',
                    'top': 0,
                    'left': 0
                })
                .appendTo($display);
        }

        $watermark.attr('src', $this.val());

    });

});
