var $input_imgs = $('.main__upload-block input');
var isImgs = {};

var _setupUpload = function() {

    // Изначально все инпуты не верные
    $input_imgs.each(function(index, el) {
        isImgs[$(el).attr('id')] = 'false';
    });


    $input_imgs.on('change',function(e) {
        _inputChanged($(this));
    });
        

    var _inputChanged = function(img){

        var file_name = img.val().split('\\').pop();
        var file_format = img.val().split('.').pop();
        var file_id = img.attr('id');
        var input_title = img.prevAll('.file__name');

        if ((file_format === 'png') || (file_format === 'jpg')) {
            input_title.text(file_name);
            isImgs[file_id] = 'true';
            _displayImage(file_id);
        }

        else {
            input_title.text("Вы ввели не изображение!!!!");
            isImgs[file_id] = 'false';
        }
    }

    var _displayImage = function (id){

        var file = document.querySelector('#'+id).files[0];
        var reader = new FileReader();

        if (!$('.wrap_img').length) {
            $('.main__container-picture-display').append('<div class="wrap_img"></div>');
        }

        reader.onload = function () {
               
            if ($('img.'+id).length) {
                $('img.'+id).attr('src',reader.result)
            }
            else {
                $('.wrap_img').append("<img src='" + reader.result + "' class='"+id +"'"  +"/>");
            }
        }

        if (file) {
            reader.readAsDataURL(file);
        }   
    }  

    // Функция валидации инпутов
    var _validate = function(){
        for (prop in isImgs){
            if (isImgs[prop] === 'false') return false;
        }
        return true;
    }
}

module.exports = {

    init: function() {
        if ($input_imgs.length) {
            _setupUpload();
        }
    },
    isvalidinput : function(){
        _validate();
    }
    
}