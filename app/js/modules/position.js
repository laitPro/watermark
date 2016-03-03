var $position = $('.position');

var _setupWidget = function() {

    $position.each(function() {

        var $this = $(this),
            $grid = $this.find('.position__grid'),
            $gridItems = $grid.find('.position__grid-cell'),
            $inputX = $this.find('.position__input-x'),
            $inputY = $this.find('.position__input-y');

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

                xLimits.max = parseInt($inputX.data('max'));
                xLimits.min = parseInt($inputX.data('min'));

                yLimits.max = parseInt($inputY.data('max'));
                yLimits.min = parseInt($inputY.data('min'));

                newPos.x = Math.round((xLimits.max - xLimits.min) * parseInt($gridItemClicked.data('pos-x')) / 100);
                newPos.y = Math.round((yLimits.max - yLimits.min) * parseInt($gridItemClicked.data('pos-y')) / 100);

                $inputX.val(newPos.x);
                $inputY.val(newPos.y);

                $gridItems.removeClass('position__grid-cell_active');
                $gridItemClicked.addClass('position__grid-cell_active');

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
