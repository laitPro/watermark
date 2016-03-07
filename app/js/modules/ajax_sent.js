
var init = function(form,url,data){
    var formData = new FormData($(form)[0]);
        formData.append('imgs_sizes', JSON.stringify(data));

        console.log(formData);
        console.log(url);

        var options = {
            type: "POST",
            processData: false,
            contentType: false,
            dataType: "json",
            data: formData,
            url:url
        };
        _sent(options);
}

var _sent = function (data) {
    console.log(data);
    var defer = $.ajax(data);

    defer.done(function (data) {
        console.log("Done");         
    });

    defer.fail(function (data){
        console.log("Error");
    })
}



module.exports = {

    init: function(form,url,data) {
            init(form,url,data)
        }
}