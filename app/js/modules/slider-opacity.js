var $slider = $('.slider');

//инициализация слайдера 
//передача значения положения слайдера в input
var sliderInit = function () {

    var rangeSlider = document.getElementById('slider-range');

    noUiSlider.create(rangeSlider, {
        start: [ .1 ],
        range: {
            'min': [  0 ],
            'max': [ 1 ]
        },
        connect: 'lower'
    });

    var rangeSliderValueElement = document.getElementById('slider-range-value');

    rangeSlider.noUiSlider.on('update', _opacity);

    function _opacity ( values, handle ) {
        rangeSliderValueElement.value = values[handle];
    };

};

//изменение прозрачности
var $watermarkImg = $('.main__container-picture-display');


var watermarkOpacity = function () {

    var rangeSliderOpacity = document.getElementById('slider-range'),
        img = document.getElementById('img_water_mark');

    rangeSliderOpacity.noUiSlider.on('update', _setOpacity);

    function _setOpacity (values, handle) {
        img.style.opacity = values[handle];
    }
    
};

module.exports = {

    init: function() {

        if ($slider.length) {
            sliderInit();
        }

        if ($watermarkImg.length) {
            watermarkOpacity();
        }

    }

}
