var $position = $('.position'),
    $display = $('.main__container-picture-display');

var _setupWidget = function() {

    $position.each(function() {

        var $this = $(this),
            $grid = $this.find('.position__grid'),
            $gridItems = $grid.find('.position__grid-cell'),
            $inputX = $this.find('.position__input_x'),
            $inputY = $this.find('.position__input_y');

        $this.on('click', function(e) {

            var $target = $(e.target),
                $gridItemClicked = $target.closest('.position__grid-cell');

            if ($gridItemClicked.length) {

                e.preventDefault();

                if ($gridItemClicked.hasClass('position__grid-cell_active')) {
                    return;
                }

                var xLimits = {},
                    yLimits = {},
                    newPos = {};

                xLimits.max = parseInt($inputX.attr('data-max'));
                xLimits.min = parseInt($inputX.attr('data-min'));

                yLimits.max = parseInt($inputY.attr('data-max'));
                yLimits.min = parseInt($inputY.attr('data-min'));

                newPos.x = Math.round((xLimits.max - xLimits.min) * parseInt($gridItemClicked.data('pos-x')) / 100);
                newPos.y = Math.round((yLimits.max - yLimits.min) * parseInt($gridItemClicked.data('pos-y')) / 100);

                $inputX
                    .val(newPos.x)
                    .trigger('change');
                $inputY
                    .val(newPos.y)
                    .trigger('change');

                $gridItems.removeClass('position__grid-cell_active');
                $gridItemClicked.addClass('position__grid-cell_active');

            }

        });

        $this.on('change', function(e) {

            var $target = $(e.target),
                $inputChanged = $target.closest('.position__input'),
                $watermark = $display.find('.watermark');

            if ($inputChanged.length) {

                var val = parseInt($inputChanged.val())

                if ($inputChanged.is($inputX)) {
                    $watermark.css('left', val + 'px');
                    return;

                } else if ($inputChanged.is($inputY)) {

                    $watermark.css('top', val + 'px');
                    return;
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

    }

};
