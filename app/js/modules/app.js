var positionModule = require('./position'),
    inputNumberModule = require('./input-number');

var $display = $('.main__container-picture-display'),
    $mainImg = $display.find('.main-img'),
    $watermark = $display.find('.watermark'),
    $posInputX = $('.position__input_x'),
    $posInputY = $('.position__input_y');

var _loadImg = function($select, $img) {
    $img.attr('src', $select.val());

    $img.get(0).onload = function() {

        var newMaxX = $watermark.length ? $mainImg.width() - $watermark.width() : $mainImg.width(),
            newMaxY = $watermark.length ? $mainImg.height() - $watermark.height() : $mainImg.height();

        inputNumberModule.setLimit($posInputX, 'max', newMaxX);
        inputNumberModule.setLimit($posInputY, 'max', newMaxY);

        var curCoord = positionModule.getGridCoord($('#watermark-position'));
        positionModule.setPosition($('#watermark-position'), curCoord.x, curCoord.y);
    };
};

var _changeWatermarkPosition = function() {

    positionModule.setInputChangeCallback(function($block, $input) {

        if ($block.is('#watermark-position')) {
            var val = parseInt($input.val())

            if ($input.is($posInputX)) {
                $watermark.css('left', val + 'px');

            } else if ($input.is($posInputY)) {

                $watermark.css('top', val + 'px');
            }
        }

    });

}

$('.big-img').on('change', function() {

    var $this = $(this),
        $mainImg = $display.find('.main-img'),
        $watermark = $display.find('.watermark')

    if (!$mainImg.length) {
        $mainImg = $('<img class="main-img" src="">');
        $display.append($mainImg);
    }

    _loadImg($this, $mainImg);

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

    _loadImg($this, $watermark);

});

module.exports = {
    init: function() {
        _changeWatermarkPosition();
    }
}
