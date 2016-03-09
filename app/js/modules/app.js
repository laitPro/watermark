var positionModule = require('./position'),
    inputNumberModule = require('./input-number');

var $canvas = $('.canvas'),
    $imgWrapper = $('.canvas__inner'),
    $mainImg = $canvas.find('.main-img'),
    $watermark = $canvas.find('.watermark'),
    $watermarkPosition = $('#watermark-position'),
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

var _dragWatermark = function() {

    $watermark.draggabilly({
        containment: true
    });

    $watermark.on('dragMove', function(event, pointer, moveVector) {

        var $this = $(this),
            position = $this.data('draggabilly').position;

        inputNumberModule.setValue($posInputX, position.x, false);
        inputNumberModule.setValue($posInputY, position.y, false);

    });

};

var _createTilingWatermark = function(gutterX, gutterY) {

    var $tiling = $imgWrapper.find('.canvas__tiling'),
        imgWrapperWidth = $imgWrapper.width(),
        imgWrapperHeight = $imgWrapper.height(),
        watermarkWidth = $watermark.width(),
        watermarkHeight = $watermark.height(),
        itemsInRow = 0,
        rows = 0,
        watermarks = 0,
        tilingWidth,
        tilingHeight;

    if (!$tiling.length) {
        $tiling = $('<div class="canvas__tiling"></div>');
        $imgWrapper.append($tiling);
    }

    $tiling.html('');

    itemsInRow = Math.floor(imgWrapperWidth / watermarkWidth);
    rows = Math.floor(imgWrapperHeight / watermarkHeight);
    watermarks = itemsInRow * rows;
    
    $tiling.width((watermarkWidth + gutterX) * itemsInRow);
    $tiling.height((watermarkHeight + gutterY) * rows);

    for (var i = 0; i < watermarks; i++) {

        var $watermarkClone = $watermark.clone();

        $watermarkClone.css({
            'position': 'static',
            'margin-left': gutterX,
            'margin-top': gutterY
        });

        $tiling.append($watermarkClone);

    }

};

var _onModeChange = function() {

    var oldLimitX,
        oldLimitY;

    $watermarkPosition.on('positionModeChange', function(e) {

        var newMode = $watermarkPosition.attr('data-mode');

        if (newMode === 'tiling') {
            $watermark.css({
                'top': 0,
                'left': 0
            });

            oldLimitX = parseInt($posInputX.attr('data-max'));
            oldLimitY = parseInt($posInputY.attr('data-max'));

            inputNumberModule.setLimit($posInputX, 'max', 100);
            inputNumberModule.setLimit($posInputY, 'max', 100);

            _createTilingWatermark(10, 10);

        } else if (newMode === 'single') {

            inputNumberModule.setLimit($posInputX, 'max', oldLimitX);
            inputNumberModule.setLimit($posInputY, 'max', oldLimitY);

            var curCoord = positionModule.getGridCoord($('#watermark-position'));
            positionModule.setPosition($('#watermark-position'), curCoord.x, curCoord.y);
        }

    });

};

var _changeWatermarkPosition = function() {

    var $watermarkInputs = $watermarkPosition.find('.position__input');

    $watermarkInputs.on('change', function(e) {

        var $this = $(this),
            val = parseInt($this.val());

        if ($watermarkPosition.attr('data-mode') === 'single') {

            if ($this.is($posInputX)) {
                $watermark.css('left', val + 'px');

            } else if ($this.is($posInputY)) {

                $watermark.css('top', val + 'px');
            }

        }

    });

};

$('.big-img').on('change', function() {

    var $this = $(this),
        $mainImg = $canvas.find('.main-img'),
        $watermark = $canvas.find('.watermark')

    if (!$mainImg.length) {
        $mainImg = $('<img class="main-img" src="">');
        $imgWrapper.append($mainImg);
    }

    _loadImg($this, $mainImg);

});

$('.small-img').on('change', function() {

    var $this = $(this),
        $watermark = $canvas.find('.watermark'),
        $mainImg = $canvas.find('.main-img');

    if (!$watermark.length) {
        $watermark = $('<img class="$watermark" src="">');
        $watermark
            .css({
                'position': 'absolute',
                'top': 0,
                'left': 0
            })
            .appendTo($imgWrapper);
    }

    _loadImg($this, $watermark);

});

module.exports = {
    init: function() {
        _changeWatermarkPosition();
        _dragWatermark();
        _onModeChange();
    }
}
