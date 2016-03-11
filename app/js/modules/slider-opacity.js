var $slider = $('.slider');

//инициализация слайдера 
//передача значения положения слайдера в input
var sliderInit = function () {

    var rangeSlider = document.getElementById('slider-range');

    noUiSlider.create(rangeSlider, {
        start: [ 1 ],
        range: {
            'min': [  0 ],
            'max': [ 1 ]
        },
        connect: 'lower'
    });

    var rangeSliderValueElement = document.getElementById('watermark-opacity');

    rangeSlider.noUiSlider.on('update', _opacity);

    function _opacity ( values, handle ) {
        rangeSliderValueElement.value = values[handle];
        $(rangeSliderValueElement).trigger('change');
    };

};

module.exports = {

    init: function() {

        if ($slider.length) {
            sliderInit();
        }

    }

}
