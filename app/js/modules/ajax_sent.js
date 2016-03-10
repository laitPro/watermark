var formData,
    options;

var init = function($form,$url,$data){

        formData = new FormData($form.get(0));
        formData.append('imgs_sizes', JSON.stringify($data));

        options = {
            type: "POST",
            processData: false,
            contentType: false,
            dataType: "json",
            data: formData,
            url:$url
        };

        $form.on('submit', _onFormSubmit)
};

var _onFormSubmit = function (e) {
    e.preventDefault();
    _sent();
};

var _sent = function () {
    console.log("try sent");
    var defer = $.ajax(options);

    defer.done(function (data) {
        console.log("Done");         
    });

    defer.fail(function (data){
        console.log("Error");
    })
};


module.exports = {

    init: function(form,url,data) {
            init(form,url,data)
        }
}