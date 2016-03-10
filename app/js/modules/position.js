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
            $gridItems = $grid.find('.position__grid-cell'),
            $inputX = $this.find('.position__input_x'),
            $inputY = $this.find('.position__input_y'),
            $crossLineX = $grid.find('.position__cross-line_vert'),
            $crossLineY = $grid.find('.position__cross-line_horiz');

        $this.on('click', function(e) {

            var $target = $(e.target),
                $gridItemClicked = $target.closest('.position__grid-cell'),
                $modeSwitchClicked = $target.closest('.position__mode');

            if ($gridItemClicked.length) {

                e.preventDefault();

                if (!$gridItemClicked.hasClass('position__grid-cell_active')) {
                    $gridItems.removeClass('position__grid-cell_active');
                    $gridItemClicked.addClass('position__grid-cell_active');
                }

                var coord = getGridCoord($this);

                setPosition($this, coord.x, coord.y);

            }

            if ($modeSwitchClicked.length) {

                e.preventDefault();

                if ($modeSwitchClicked.hasClass('position__mode_active')) {
                    return;
                }

                var newMode = $modeSwitchClicked.data('mode');

                $modeSwitchClicked
                    .addClass('position__mode_active')
                    .siblings()
                    .removeClass('position__mode_active');

                $this.attr('data-mode', newMode);

                $inputModule.setValue($inputX, 0, false);
                $inputModule.setValue($inputY, 0, false);

                switch (newMode) {

                case ('tiling'):
                    $grid.addClass('position__grid_tiling');
                    break;

                case ('single'):
                    $grid.removeClass('position__grid_tiling');
                    break;

                }

                $this.trigger('positionModeChange');

            }

        });

        $this.on('change', function(e) {

            var $target = $(e.target),
                $inputChanged = $target.closest('.position__input'),
                $watermark = $display.find('.watermark');

            if ($inputChanged.length) {

                if ($this.attr('data-mode') === 'tiling') {

                    var inputVal = parseInt($inputChanged.val()),
                        maxVal = parseInt($inputChanged.attr('data-max')),
                        newSize = inputVal / maxVal * 100 + '%';

                    if ($inputChanged.is($inputX)) {
                        $crossLineX.css('width', newSize);
                    } else if ($inputChanged.is($inputY)) {
                        $crossLineY.css('height', newSize);
                    }

                }

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
