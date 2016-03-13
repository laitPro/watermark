var formData,
    options;

var init = function($form,$url,$data){
        var form = $form[0];
        //console.log(form);
        formData = new FormData(form);
        formData.append('imgs_sizes', JSON.stringify($data));
        //console.log(formData);
        options = {
            type: "POST",
            processData: false,
            contentType: false,
            dataType: "json",
            data: formData,
            url:$url
        };
        //console.log(options);
        _sent($form);
};

var _sent = function (form) {
    var defer = $.ajax(options);

    defer.done(function (data) {
        window.location = "./php/new.php?name=result.jpg";
        form.trigger('formSend',[data]);
    });

    defer.fail(function (){
        console.log("error");
        form.trigger('formSendError');     
    })
};

module.exports = {
    init: function(form,url,data) {
            init(form,url,data);
        }
}