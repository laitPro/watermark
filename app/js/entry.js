'use strict';

$(function() {

    var inputNumberModule = require('./modules/input-number'),
        sliderOpacitySlider = require('./modules/slider-opacity'),
        positionModule = require('./modules/position'),
        imgupload = require('./modules/file-upload');

    positionModule.init();
    inputNumberModule.init();
    sliderOpacitySlider.init();
    imgupload.init();

    var $display = $('.main__container-picture-display'),
        $posInputX = $('.position__input_x'),
        $posInputY = $('.position__input_y');

    $('.big-img').on('change', function() {

        var $this = $(this),
            $mainImg = $display.find('.main-img'),
            $watermark = $display.find('.watermark')

        if (!$mainImg.length) {
            $mainImg = $('<img class="main-img" src="">');
            $display.append($mainImg);
        }

        $mainImg.attr('src', $this.val());

        $mainImg.get(0).onload = function() {

            var newMaxX = $watermark.length ? $mainImg.width() - $watermark.width() : $mainImg.width(),
                newMaxY = $watermark.length ? $mainImg.height() - $watermark.height() : $mainImg.height();

            $posInputX
                .attr('data-max', newMaxX)
                .trigger('change');
            $posInputY
                .attr('data-max', newMaxY)
                .trigger('change');
        };

    });

    $('.small-img').on('change', function() {

        var $this = $(this),
            $watermark = $display.find('.watermark'),
            $mainImg = $display.find('.main-img');

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

        $watermark.get(0).onload = function() {
            var newMaxX = $mainImg.width() - $watermark.width(),
                newMaxY = $mainImg.height() - $watermark.height();

            $posInputX
                .attr('data-max', newMaxX)
                .trigger('change');
            $posInputY
                .attr('data-max', newMaxY)
                .trigger('change');
        };

    });

});
