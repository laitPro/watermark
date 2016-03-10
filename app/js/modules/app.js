var positionModule = require('./position'),
    inputNumberModule = require('./input-number'),
    imgLoaderModule = require('./file-upload');

var $canvas = $('.canvas'),
    $imgWrapper = $('.canvas__inner'),
    $mainImg = $('#main-img'),
    $watermark = $('#watermark'),
    $watermarkPosition = $('#watermark-position'),
    $bigImgInput = $('#big-img-input'),
    $watermarkInput = $('#watermark-input'),
    $opacityInput = $('#watermark-opacity'),
    $posInputX = $('.position__input_x'),
    $posInputY = $('.position__input_y');

var _loadImg = function() {

    var newMaxX = $watermark.length ? $mainImg.width() - $watermark.width() : $mainImg.width(),
        newMaxY = $watermark.length ? $mainImg.height() - $watermark.height() : $mainImg.height();

    inputNumberModule.setLimit($posInputX, 'max', newMaxX);
    inputNumberModule.setLimit($posInputY, 'max', newMaxY);

    var curCoord = positionModule.getGridCoord($watermarkPosition);
    
    if (isNaN(curCoord.x) || isNaN(curCoord.y)) {
        positionModule.setPosition($watermarkPosition, 0, 0);
    } else {
        positionModule.setPosition($watermarkPosition, curCoord.x, curCoord.y);  
    }
    
};

var _uploadBigImg = function() {
    
    $bigImgInput.on('imgLoaded', function(e) {
        
        imgLoaderModule.drawImage($bigImgInput, $imgWrapper, 'big-img', 'main-img', function($img) {
            $mainImg = $img;
            
            _loadImg();
        });
        
    });
    
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

var _uploadWatermark = function() {
    
    var firstLoad = true;
    
    $watermarkInput.on('imgLoaded', function(e) {
        
        imgLoaderModule.drawImage($watermarkInput, $imgWrapper, 'watermark', 'watermark', function($img) {
            
            $watermark = $img;

            _loadImg();
            
            if (firstLoad) {
                _setWatermarkOpacity();
                _dragWatermark();
                firstLoad = false;
            }
        });
        
    });
    
};

var _setWatermarkOpacity = function() {
    var val = $opacityInput.val();
    
    $watermark.css('opacity', val);
}

var _changeWatermarkOpacity = function() {
    
    $opacityInput.on('change', _setWatermarkOpacity);
    
};

//var _createTilingWatermark = function(gutterX, gutterY) {
//
//    var $tiling = $imgWrapper.find('.canvas__tiling'),
//        imgWrapperWidth = $imgWrapper.width(),
//        imgWrapperHeight = $imgWrapper.height(),
//        watermarkWidth = $watermark.width(),
//        watermarkHeight = $watermark.height(),
//        itemsInRow = 0,
//        rows = 0,
//        watermarks = 0,
//        tilingWidth,
//        tilingHeight;
//
//    if (!$tiling.length) {
//        $tiling = $('<div class="canvas__tiling"></div>');
//        $imgWrapper.append($tiling);
//    }
//
//    $tiling.html('');
//
//    itemsInRow = Math.floor(imgWrapperWidth / watermarkWidth);
//    rows = Math.floor(imgWrapperHeight / watermarkHeight);
//    watermarks = itemsInRow * rows;
//    
//    $tiling.width((watermarkWidth + gutterX) * itemsInRow);
//    $tiling.height((watermarkHeight + gutterY) * rows);
//
//    for (var i = 0; i < watermarks; i++) {
//
//        var $watermarkClone = $watermark.clone();
//
//        $watermarkClone.css({
//            'position': 'static',
//            'margin-left': gutterX,
//            'margin-top': gutterY
//        });
//
//        $tiling.append($watermarkClone);
//
//    }
//
//};
//
//var _onModeChange = function() {
//
//    var oldLimitX,
//        oldLimitY;
//
//    $watermarkPosition.on('positionModeChange', function(e) {
//
//        var newMode = $watermarkPosition.attr('data-mode');
//
//        if (newMode === 'tiling') {
//            $watermark.css({
//                'top': 0,
//                'left': 0
//            });
//
//            oldLimitX = parseInt($posInputX.attr('data-max'));
//            oldLimitY = parseInt($posInputY.attr('data-max'));
//
//            inputNumberModule.setLimit($posInputX, 'max', 100);
//            inputNumberModule.setLimit($posInputY, 'max', 100);
//
//            _createTilingWatermark(10, 10);
//
//        } else if (newMode === 'single') {
//
//            inputNumberModule.setLimit($posInputX, 'max', oldLimitX);
//            inputNumberModule.setLimit($posInputY, 'max', oldLimitY);
//
//            var curCoord = positionModule.getGridCoord($('#watermark-position'));
//            positionModule.setPosition($('#watermark-position'), curCoord.x, curCoord.y);
//        }
//
//    });
//
//};

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

module.exports = {
    init: function() {
        _uploadBigImg();
        _uploadWatermark();
        _changeWatermarkPosition();
        _changeWatermarkOpacity();
        //_onModeChange();
    }
}
