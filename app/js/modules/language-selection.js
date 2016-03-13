var $lang = $('.lang__item');

//переключение языков
var switchLang = function () {

    var cookieInit = {

        getCookie : function (name) {
          var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
          return matches ? decodeURIComponent(matches[1]) : undefined;
        },

        setCookie : function (name, value, options) {
          options = options || {};

          var expires = options.expires;

          if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
          }
          if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
          }

          value = encodeURIComponent(value);

          var updatedCookie = name + "=" + value;

          for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
              updatedCookie += "=" + propValue;
            }
          }

          document.cookie = updatedCookie;
        },

        deleteCookie : function  (name) {
          setCookie(name, "", {
            expires: -1
          })
        }
    };

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

    //var cookieLang = cookieInit.setCookie('lang', 'ru');


    $.getJSON('app/resources/data/language-switch.json', function (data) {

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