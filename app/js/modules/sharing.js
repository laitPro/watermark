var $lang = $('.social__link');


var sharing = function () {
    var Share = {
        vkontakte: function(purl, ptitle, pimg, text) {
            url  = 'http://vkontakte.ru/share.php?';
            url += 'url='          + encodeURIComponent(purl);
            url += '&title='       + encodeURIComponent(ptitle);
            url += '&description=' + encodeURIComponent(text);
            url += '&image='       + encodeURIComponent(pimg);
            url += '&noparse=true';
            Share.popup(url);
        },

        facebook: function(purl, ptitle, pimg, text) {
            url  = 'http://www.facebook.com/sharer.php?s=100';
            url += '&p[title]='     + encodeURIComponent(ptitle);
            url += '&p[summary]='   + encodeURIComponent(text);
            url += '&p[url]='       + encodeURIComponent(purl);
            url += '&p[images][0]=' + encodeURIComponent(pimg);
            Share.popup(url);
        },

        twitter: function(purl, ptitle) {
            url  = 'http://twitter.com/share?';
            url += 'text='      + encodeURIComponent(ptitle);
            url += '&url='      + encodeURIComponent(purl);
            url += '&counturl=' + encodeURIComponent(purl);
            Share.popup(url);
        },

        popup: function(url) {
            window.open(url,'','toolbar=0,status=0,width=626,height=436');
        }
    };
    var purl = location.host; //TODO: здесь вписать URL нашего сайте
    var pimg = 'http://img.tourister.ru/files/6/1/4/9/9/7/6/clones/600_600_fixed.jpg'; //TODO: URL к заглавной картинке нашего сайта
    var ptitle = $('title').text(); //по клику?
    var ptext = $('meta[name="description"]').attr('content');



    $('.social__link_vk').on('click', function () {
        Share.vkontakte(purl, ptitle, pimg, ptext)
    });

    $('.social__link_fb').on('click', function () {
        Share.facebook(purl, ptitle, pimg, ptext)
    });

    $('.social__link_twt').on('click', function () {
        Share.twitter(purl, ptitle)
    });
}

module.exports = {

    init: function() {

        if ($lang.length) {
            sharing();
        }

    }

}
