
var reset = function (){

	var $forms = $('form');
	

	$forms.each(function(index, elem){
			
			$(elem).on('reset', _onResetForm);							      
    });
}

var _onResetForm = function(){

	if ( $(this).hasClass('main__container-aside-shell-form') ) {
		$(this).trigger('main-formReset');		
	};
}




module.exports = {
    init : reset   
}