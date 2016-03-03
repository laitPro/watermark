var $inputNumber = $('.input-number');

var isNumeric = require('../functions/is-numeric');

var _setupWidget = function() {

    $inputNumber.each(function() {

        var $this = $(this),
            $field = $this.find('.input-number__field'),
            fieldVal = 0;

        $field.val(fieldVal);

        $this.on('mousedown click change', function(e) {

            var $target = $(e.target),
                eventType = e.type,
                maxVal = $field.attr('data-max'),
                minVal = $field.attr('data-min');

            var _changeVal = function() {

                // проверяем был ли клик соверешен по стрелке изменения значения
                var $spinClicked = $target.closest('.input-number__spin');

                if ($spinClicked.length) {

                    // если это стрелка увеличения, увеличиваем значение
                    if ($spinClicked.hasClass('input-number__spin_more') && fieldVal < maxVal) {
                        $field.val(++fieldVal);

                    // если это стрелка уменьшения, уменьшаем значение
                    } else if ($spinClicked.hasClass('input-number__spin_less') && fieldVal > minVal) {

                        $field.val(--fieldVal);
                    }

                    $field.trigger('change');

                }

            };

            switch (eventType) {

            // если тип события клик
            case ('click'):

                _changeVal();
                break;

            // если тип события нажатие кнопки мыши
            case ('mousedown'):

                // если кнопка мыши нажата более 700мс начинаем ускоренно менять значение инпута
                var timer1 = setTimeout(function() {

                    var timer2 = setInterval(_changeVal, 50);

                    $this.on('mouseup', function() {
                        clearInterval(timer2);
                    });

                }, 700);

                $this.on('mouseup', function() {
                    clearTimeout(timer1);
                });

            // если тип события change
            case ('change'):

                // проверяем произошло ли событие в инпуте
                var $fieldChanged = $target.closest('.input-number__field');

                if ($fieldChanged.length) {

                    var newVal = $fieldChanged.val();

                    // если новое значение не является числом, то ставим инпуту 0
                    if (!isNumeric(newVal)) {
                        $fieldChanged.val(0);

                    // если новое введенное значение больше максимально допустимого, ставим максимальное
                    } else if (parseInt(newVal) > maxVal) {

                        $fieldChanged.val(maxVal);

                    // если новое введенное значение меньше минимально допустимого, ставим минимальное
                    } else if (parseInt(newVal) < minVal) {

                        $fieldChanged.val(minVal);
                    }

                }

                break;

            }

            fieldVal = parseInt($field.val());

        });

    });

};

module.exports = {

    init: function() {

        if ($inputNumber.length) {
            _setupWidget();
        }

    }

}
