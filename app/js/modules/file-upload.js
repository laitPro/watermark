var $input_imgs = $('.maine__upload-block input');
var isImgs = {};

var _setupUpload = function() {

	$input_imgs.on('change',function(e) {
		_inputChanged($(this));
	});
		

	var _inputChanged = function(img){

		var file_name = img.val().split('\\').pop();
		var file_format = img.val().split('.').pop();
		var file_id = img.attr('id');
		var input_title = img.prevAll('.file__name');

		if ((file_format === 'png') || (file_format === 'jpg')) {
			console.log("its imgs");
			input_title.text(file_name);
			isImgs[file_id] = 'true';
			_displayImage(img,file_id)
		}

		else{
			input_title.text("Вы ввели не изображение!!!!");
			console.log("its not images!");
			isImgs[file_id] = 'false';
		}
		console.log(isImgs);
	}

	// var _displayImage = function(img,id){
	// 	console.log(img,id);


	// 	 $('#big_img').fileupload({
	//         dataType: 'json',
	//         done: function (e, data) {
	//             console.log('oke');
 //       		}
 //    	});
	// }


	

	
}





module.exports = {

    init: function() {
    	if ($input_imgs.length) {
            _setupUpload();
        }
    }

}