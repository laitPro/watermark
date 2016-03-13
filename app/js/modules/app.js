var positionModule = require('./position'),
    inputNumberModule = require('./input-number'),
    imgLoaderModule = require('./file-upload'),
    ajaxSentModule = require('./ajax_sent.js');

var $canvas = $('.canvas'),
    $imgWrapper = $('.canvas__inner'),
    $mainImg = $('#main-img'),
    $watermark = $('#watermark'),
    $tiling = $imgWrapper.find('.canvas__tiling'),
    $tilingWrapper,
    $watermarkPosition = $('#watermark-position'),
    $bigImgInput = $('#big-img-input'),
    $watermarkInput = $('#watermark-input'),
    $opacityInput = $('#watermark-opacity'),
    $posInputX = $('.position__input_x'),
    $posInputY = $('.position__input_y'),
    $form = $('.main__container-aside-shell-form'),
    $data = {},
    $url = '../php/some_php.php',
    imgChanged = false;

var getDataAboutImg = function(id) {
    var $img = $('#'+id);

    $data[$img.attr('id')+"_client_width"] = $img.width();
    $data[$img.attr('id')+"_client_height"] = $img.height();

};

var _sentForm = function(){
    ajaxSentModule.init($form,$url,$data);
};
    

// Эта функция проверяет размеры новых загруженных изображений и устанавливает новые ограничения для перемещения 
// водного знака, в соотвествии с этими вычислениями
var _loadImg = function() {
    
    if ($watermarkPosition.attr('data-mode') === 'single') {
        
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
        
        imgChanged = true;
        
    } else if ($watermarkPosition.attr('data-mode') === 'tiling') {
        
        _updateTiling(true);
    }
    
};

// Обработчик загрузки большого изображения
var _uploadBigImg = function() {
    
    $bigImgInput.on('imgLoaded', function(e) {
        
        imgLoaderModule.drawImage($bigImgInput, $imgWrapper, 'big-img', 'main-img', function($img) {
            $mainImg = $img;
            getDataAboutImg('big-img');
            setTimeout(_loadImg, 10); // костыль для IE, без этого он берет размеры старого изображения
        });
        
    });
    
};

// drag для водяного знака
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

var _dragTiling = function() {
    
    $tiling.draggabilly({
        containment: '.canvas__tiling-wrapper'
    });
    
};

var watermarkFirstLoad = true;

// Обработчик загрузки водяного знака
var _uploadWatermark = function() {
    
    $watermarkInput.on('imgLoaded', function(e) {
        
        imgLoaderModule.drawImage($watermarkInput, $imgWrapper, 'watermark', 'watermark', function($img) {
            
            $watermark = $img;

            setTimeout(_loadImg, 10); // костыль для IE, без этого он берет размеры старого изображения
            
            if (watermarkFirstLoad) {
                _setWatermarkOpacity();
                _dragWatermark();
                watermarkFirstLoad = false;
            }

            getDataAboutImg('watermark');
        });
        
    });
    
};

// установить новое значение прозрачности для водяного знака
var _setWatermarkOpacity = function() {
    var val = $opacityInput.val(),
        $watermarks = $imgWrapper.find('.watermark');
    
    $watermarks.css('opacity', val);
}

// обработчик изменения слайдера прозрачности
var _changeWatermarkOpacity = function() {
    
    $opacityInput.on('change', _setWatermarkOpacity);
    
};
    
var tilingFirstLoad = true;

// если параметр create === true, то заново пересоздает всех клонов водяного знака для замощения
// если false, то пересчитывает размеры обертки для клонов и устанавливает им новые отступы
var _updateTiling = function(create) {
    
    var imgWrapperWidth = $imgWrapper.width(),
        imgWrapperHeight = $imgWrapper.height(),
        watermarkWidth = $watermark.width(),
        watermarkHeight = $watermark.height(),
        gutterX = inputNumberModule.getValue($posInputX),
        gutterY = inputNumberModule.getValue($posInputY),
        itemsInRow = 0,
        rows = 0,
        watermarks = 0,
        tilingWidth,
        tilingHeight;
    
    itemsInRow = Math.floor((imgWrapperWidth + 100) / watermarkWidth) + 2;
    rows = Math.floor((imgWrapperHeight + 100) / watermarkHeight) + 2;
    watermarks = itemsInRow * rows;
    tilingWidth = (watermarkWidth + gutterX) * itemsInRow;
    tilingHeight = (watermarkHeight + gutterY) * rows;
    
    if (create) {
        
        if (!$tiling.length) {
            $tiling = $('<div class="canvas__tiling"></div>');
            $imgWrapper.append($tiling);
        }

        $tiling.html('');

        for (var i = 0; i < watermarks; i++) {

            var $watermarkClone = $watermark.clone();

            $watermarkClone
                .removeAttr('id')
                .css({
                    'position': '',
                    'display': ''
                });

            $tiling.append($watermarkClone);

        }
        
        if (tilingFirstLoad) {
            $tilingWrapper = $('<div class="canvas__tiling-wrapper"></div>')
            $tiling.wrapAll($tilingWrapper);
            
            $tilingWrapper = $tiling.parent();

            _dragTiling();

            tilingFirstLoad = false;
        }
    }
    
    $tiling.width(tilingWidth);
    $tiling.height(tilingHeight); 
    $tilingWrapper.width($tiling.width() + 100);
    $tilingWrapper.height($tiling.height() + 100);
    
    var $watermarkClones = $tiling.find('.watermark');
    
    $watermarkClones.css({
        'margin-left': gutterX,
        'margin-top': gutterY
    });
    
};

// обработчик изменения режима отображения водяного знака
var _onModeChange = function() {

    $watermarkPosition.on('positionModeChange', function(e) {

        var newMode = $watermarkPosition.attr('data-mode');

        if (newMode === 'tiling') {
            
            $watermark.css({
                'top': 50,
                'left': 50
            });

            inputNumberModule.setLimit($posInputX, 'max', 100);
            inputNumberModule.setLimit($posInputY, 'max', 100);

            if (!$tiling.length) {
                _updateTiling(true);
            }
            
            if (imgChanged) {
                _loadImg();
                imgChanged = false;
            }
            
            $tilingWrapper.show();
            $watermark.hide();

        } else if (newMode === 'single') {
            
            $tilingWrapper.hide();
            $watermark.show();

            _loadImg();
        }

    });

};

// меняет позицию водяного знака
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

        } else if ($watermarkPosition.attr('data-mode') === 'tiling') {
            
            if ($tiling.length) {
                _updateTiling();
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
        _sentForm();
        _onModeChange();
    }
}
