var formData,
    options,
    form;

var init = function($form,$url,$data){
        form = $form;

        formData = new FormData($form.get(0));
        formData.append('imgs_sizes', JSON.stringify($data)),
        options = {
            type: "POST",
            processData: false,
            contentType: false,
            dataType: "json",
            data: formData,
            url:$url
        };

        $form.on('submit', _onFormSubmit);
};

var _onFormSubmit = function (e) {
    e.preventDefault();
    _sent($(this));
};

var _sent = function (form) {
    var defer = $.ajax(options);

    defer.done(function (data) { 
        form.trigger('formSend',[data]);    
    });

    defer.fail(function (){
        form.trigger('formSendError');     
    })
};


module.exports = {

    init: function(form,url,data) {
            init(form,url,data);
        }
}