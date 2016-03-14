var $lang = $('.lang__item');

//переключение языков
var switchLang = function () {

    //функция, которая берет элемент и подставляет в него значение, которое содержится в JSON
    var _itemLang = function (lang, i) {

        $('title').text(lang.title[i]);
        $('.main__container-picture-title-name').text(lang.title[i]);
        $('.main__container-aside-shell-title-name').text(lang.settings[i]);
        $('.label__title_image').text(lang.sourceInput[i]);
        $('.label__title_watermark').text(lang.watermarkInput[i]);
        $('.file__name').text(lang.input[i]);
        $('.position__title').text(lang.place[i]);
        $('.opacity__title').text(lang.transparency[i]);
        $('.main__container-aside-shell-form-container-buttom-reset').text(lang.reset[i]);
        $('.main__container-aside-shell-form-container-buttom-Upload').text(lang.download[i]);
        $('.copyright').text(lang.footer[i]);
    };

    $.getJSON('data/language-switch.json', function (data) {

    $('.lang__link').on('click', _setLang);
        function _setLang (e) {
            e.preventDefault();

            var $this = $(this),
                $other = $('.lang__link').not($this),
                $lang = $('body');

            if ($this.hasClass('lang__link_en')){

                _itemLang(data.switch, 0);
                $this.addClass('active');
                $other.removeClass('active');
                $lang.attr('lang', 'en');
    

            } else {

                _itemLang(data.switch, 1);
                $this.addClass('active');
                $other.removeClass('active');
                $lang.attr('lang', 'ru');

            } 
        } 


    });

};


module.exports = {

    init: function() {

        if ($lang.length) {
            switchLang();
        }

    }

}