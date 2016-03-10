'use strict';

$(function() {

    var inputNumberModule = require('./modules/input-number'),
        sliderOpacitySlider = require('./modules/slider-opacity'),
        positionModule = require('./modules/position'),
        imgupload = require('./modules/file-upload'),
        ajax = require('./modules/ajax_sent.js');

    positionModule.init();
    inputNumberModule.init();
    sliderOpacitySlider.init();
    imgupload.init();

    // Получаем форму
    var form = $('.main__container-aside-shell-form');
     //Получаем данные дополнительные для отправки
    var data = {};
    var url = '../php/some_php.php';

    form.on('submit', function(event) {
        event.preventDefault();
        // Получаем все картинки
        var all_imgs = $('.canvas__inner img');
        if (all_imgs.length === 2) {
            all_imgs.each(function(index, el) {
                // Собираем данные о картинках
                data[$(el).attr('id')+"_client_width"] = $(el).width();
                data[$(el).attr('id')+"_client_height"] = $(el).height();
            });
            ajax.init(form,url,data);
        };
    });

});
