var $position = $('.position'),
    $display = $('.main__container-picture-display'),
    $inputModule = require('./input-number');

var setPosition = function($block, positionX, positionY) {

    var $inputX = $block.find('.position__input_x'),
        $inputY = $block.find('.position__input_y'),
        xLimits = {},
        yLimits = {},
        newPos = {};

    xLimits.max = parseInt($inputX.attr('data-max'));
    xLimits.min = parseInt($inputX.attr('data-min'));

    yLimits.max = parseInt($inputY.attr('data-max'));
    yLimits.min = parseInt($inputY.attr('data-min'));

    newPos.x = Math.round((xLimits.max - xLimits.min) * positionX / 100);
    newPos.y = Math.round((yLimits.max - yLimits.min) * positionY / 100);

    $inputModule.setValue($inputX, newPos.x);
    $inputModule.setValue($inputY, newPos.y);

};

var getGridCoord = function($block) {

    if ($block.is('.position')) {
        var $gridCellActive = $block.find('.position__grid-cell_active'),
            coord = {};

        coord.x = parseInt($gridCellActive.data('pos-x'));
        coord.y = parseInt($gridCellActive.data('pos-y'));

        return coord;
    }

};

var _inputChangeCallback = function() {};

var _setupWidget = function() {

    $position.each(function() {

        var $this = $(this),
            $grid = $this.find('.position__grid'),
            $gridItems = $grid.find('.position__grid-cell');

        $this.on('click', function(e) {

            var $target = $(e.target),
                $gridItemClicked = $target.closest('.position__grid-cell');

            if ($gridItemClicked.length) {

                e.preventDefault();

                if ($gridItemClicked.hasClass('position__grid-cell_active')) {
                    return;
                }

                $gridItems.removeClass('position__grid-cell_active');
                $gridItemClicked.addClass('position__grid-cell_active');

                var coord = getGridCoord($this);

                setPosition($this, coord.x, coord.y);

            }

        });

        $this.on('change', function(e) {

            var $target = $(e.target),
                $inputChanged = $target.closest('.position__input'),
                $watermark = $display.find('.watermark');

            if ($inputChanged.length) {

                _inputChangeCallback($this, $inputChanged);

            }

        });

    });

};

module.exports = {

    init: function() {
        if ($position.length) {
            _setupWidget();
        }
    },

    setPosition: setPosition,

    getGridCoord: getGridCoord,

    setInputChangeCallback: function(callback) {
        _inputChangeCallback = callback;
    }

};
