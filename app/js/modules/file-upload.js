var $input_imgs = $('input[type=file]');
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
    var _setName = function(img,field){
        // где отображаем картинку
        var displayblock = $('.canvas__inner');

        var file_name = img.val().split('\\').pop();
        var file_format = img.val().split('.').pop();
        var file_id = img.attr('id');
        var input_title = img.prevAll('.file__name');


        if ((file_format === 'png') || 
            (file_format === 'jpg') ||
            (file_format === 'JPG')
            ){
                input_title.text(file_name);
                isImgs[file_id] = 'true';
                displayImage(file_id,displayblock);
        }
        else 
            if (isImgs[file_id] === 'false'){
                input_title.text("Вы ввели не изображение!!!!");
            }
    }
}  

// Функция отрисовки изображения из файла : что отрисовываем, где отрисовываем
var displayImage = function (id,where){
    var file = $('#'+id)[0].files[0];
    var reader = new FileReader();

    reader.onload = function () {              
        if ($('img.'+id).length) {
            $('img.'+id).attr('src',reader.result);
        }
        else {
            where.append("<img src='" + reader.result + "' class='"+id +"'"+ "id='img_"+id+"'"  +"/>");
            
        }
        var img = $('img.'+id);
    }
    if (file) {
        reader.readAsDataURL(file);
    }   
}

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
    drawimage : displayImage
     
}