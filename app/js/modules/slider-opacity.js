var $slider = $('.slider');

var sliderInit = function () {

    var rangeSlider = document.getElementById('slider-range');

    noUiSlider.create(rangeSlider, {
        start: [ 4000 ],
        range: {
            'min': [  2000 ],
            'max': [ 10000 ]
        }
    });

}

module.exports = {

    init: function() {

        if ($slider.length) {
            sliderInit();
        }

    }

}
