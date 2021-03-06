var $input_imgs = $('input[type=file]');
var $input_imgs_text = $('.fn');
var isImgs = {};

var _setupUpload = function() {

    // Изначально все инпуты не верные
    $input_imgs.each(function(index, el) {
        isImgs[$(el).attr('id')] = 'false';
    });

    $input_imgs.on('change',function(e) {
        _setName($(this));
    });
        
    // Функция для установки в поле название файла : файл, где установить его имя   
    var _setName = function(input) {
        // где отображаем картинку
        var displayblock = $('.canvas__inner');

        var file_name = input.val().split('\\').pop();
        var file_format = input.val().split('.').pop();
        var file_id = input.attr('id');
        var input_title = input.prevAll('.file__name');

        if (((file_format === 'png') || 
            (file_format === 'jpg') ||
            (file_format === 'JPG')) && (input[0].files[0].size < 2500000)
            ) {
                    console.log(input[0].files[0].size);
                input_title.text(file_name);
                isImgs[file_id] = 'true';
                input_title.removeClass('file__name');
                input_title.addClass('file__name_upload');
            
                input.trigger('imgLoaded');
            
        } else {
           if (isImgs[file_id] === 'false') {
                if ($('body').attr('lang') === 'ru'){
                    input_title.text("Файл не выбран");
                }
                else{
                    input_title.text("File is not selected");
                }    
            } 
        }
    }
}  

// Функция отрисовки изображения из файла : инпут из которого берем файл, где отрисовываем, id и класс отрисованной картинки
var drawImage = function ($input, $where, id, className, callback) {
    
    var file = $input.get(0).files[0],
        reader = new FileReader(),
        $img;
 
    if (file) {
        reader.readAsDataURL(file);
    }
    
    reader.onload = function () {

        
        var $imgOld = $('#' + id);
        
        if ($imgOld.length) {
            $imgOld.attr('src', reader.result);
            
        } else {
            
            $where.append('<img src="' + reader.result + '" class="' + className + '" id="' + id + '"/>');
        }
        
        $img = $('#' + id);
        
        callback($img);
    }
    
}

var deleteImgs = function($where){

    $where.find('img').remove();

};

var reset = function($inputs) {

    $inputs.each(function() {
        
        var $this = $(this),
            $container = $this.closest('.input__wrap '),
            $text = $container.find('.fn');
        
        isImgs[$this.attr('id')] = 'false';
        
        $text.toggleClass('file__name_upload file__name');
        
        if ($('body').attr('lang') === 'ru'){
            $text.text("Файл не выбран");
        }
        else
            $text.text("File is not selected");
    });

};

// Функция валидации инпутов
var validate = function(){
    for (prop in isImgs){
        if (isImgs[prop] === 'false') return false;
    }
    return true;
}

module.exports = {

    init: function() {
        if ($input_imgs.length) {
            _setupUpload();
        }
    },
    isvalidinput : validate,
    drawImage : drawImage,
    reset : reset,
    deleteimgs : deleteImgs
     
}