var $inputNumber = $('.input-number');

var _isNumeric = require('../functions/is-numeric');

var setValue = function($elem, val, change) {

    var triggerChange = change === false ? false : true;

    if ($elem.is('.input-number__field')) {
        $elem.val(parseInt(val));

        if (triggerChange) {
            $elem.trigger('change');
        }
    }

};

var getValue = function($elem) {

    if ($elem.is('.input-number__field')) {
        return parseInt($elem.val());
    }

};

var setLimit = function($elem, limitEdge, val) {

    if ($elem.is('.input-number__field')) {
        $elem.attr('data-' + limitEdge, val);
        $elem.trigger('change');
    }

};

var _validateValue = function($elem, val) {

    var maxVal = parseInt($elem.attr('data-max')),
        minVal = parseInt($elem.attr('data-min'));

    // если новое значение не является числом, то ставим инпуту 0
    if (!_isNumeric(val)) {
        $elem.val(0);

    // если новое введенное значение больше максимально допустимого, ставим максимальное
    } else if (parseInt(val) > maxVal) {

        $elem.val(maxVal);

    // если новое введенное значение меньше минимально допустимого, ставим минимальное
    } else if (parseInt(val) < minVal) {

        $elem.val(minVal);

    } else {

        $elem.val(val);
    }

};

var _setupWidget = function() {

    $inputNumber.each(function() {

        var $this = $(this),
            $field = $this.find('.input-number__field'),
            fieldVal = 0,
            validationEnd = false;

        $field.val(0);

        $this.on('mousedown click change', function(e) {

            var $target = $(e.target),
                eventType = e.type;

            var _changeValWhenSpinClicked = function() {

                // проверяем был ли клик соверешен по стрелке изменения значения
                var $spinClicked = $target.closest('.input-number__spin');

                if ($spinClicked.length) {

                    fieldVal = $field.val();

                    // если это стрелка увеличения, увеличиваем значение
                    if ($spinClicked.hasClass('input-number__spin_more')) {
                        setValue($field, ++fieldVal);

                    // если это стрелка уменьшения, уменьшаем значение
                    } else if ($spinClicked.hasClass('input-number__spin_less')) {

                        setValue($field, --fieldVal);
                    }

                }

            };

            switch (eventType) {

            // если тип события клик
            case ('click'):

                _changeValWhenSpinClicked();
                break;

            // если тип события нажатие кнопки мыши
            case ('mousedown'):

                // если кнопка мыши нажата более 700мс начинаем ускоренно менять значение инпута
                var timer1 = setTimeout(function() {

                    var timer2 = setInterval(_changeValWhenSpinClicked, 50);

                    $this.on('mouseup', function() {
                        clearInterval(timer2);
                    });

                }, 700);

                $this.on('mouseup', function() {
                    clearTimeout(timer1);
                });
                break;

            // если тип события change
            case ('change'):

                // проверяем произошло ли событие в инпуте
                var $fieldChanged = $target.closest('.input-number__field');                   

                if ($fieldChanged.length) {

                    if (!validationEnd) {
                        var newVal = $fieldChanged.val();

                        _validateValue($fieldChanged, newVal);
                        
                        validationEnd = true;
                        $fieldChanged.trigger('change');
                        
                        return;
                    }
                    
                    validationEnd = false;

                }

            }

        });

    });

};

module.exports = {

    init: function() {
        if ($inputNumber.length) {
            _setupWidget();
        }
    },

    setValue: setValue,

    getValue: getValue,

    setLimit: setLimit

}
