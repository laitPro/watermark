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
    }


    //обращение к JSON файлу
    $.getJSON('app/resources/data/language-switch.json', function (data) {

        var $langRu = $('.lang__link_ru'),
            $langEn = $('.lang__link_en');

        $langEn.on('click', function (e) {
            e.preventDefault();

            _itemLang(data.switch, 0);

            $langEn.addClass('active');
            $langRu.removeClass('active');
        });

        $langRu.on('click', function (e) {
            e.preventDefault();

            _itemLang(data.switch, 1);
            $langRu.addClass('active');
            $langEn.removeClass('active');
        });

    });

};

module.exports = {

    init: function() {

        if ($lang.length) {
            switchLang();
        }

    }

}