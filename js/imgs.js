











function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                var files = allText.split('\n');
                document.getElementsByClassName(".grid").innerHTML = "";
                $(".grid").empty();
                var inner = "";
                files.forEach(element => inner += '<img class="names" src="/images/' + element + '">')

                $(".grid").html(inner.substr(0, inner.length - 1));
            }
        }
    }
    rawFile.send(null);
}

readTextFile('data');


$('.close-icon').click(function () {
    $('.modal').toggleClass("show");
    $('.show-btn').removeClass("disabled");
});
$('.close-btn').click(function () {
    $('.modal').toggleClass("show");
    $('.show-btn').removeClass("disabled");
});

$('img').click(async function () {
    var new_text_name = $(this).attr('src');
    new_text_name = new_text_name.substr(8, new_text_name.length);
    var old_text_name = $('.left-text').html();
    old_text_name = old_text_name.substr(8, old_text_name.length);
    $('.left-text').html(old_text_name);//Old text
    new_text_name = new_text_name.replaceAll('.png','');
    var new_text_command = "/imagemap place " + new_text_name + " true true 1x1";
    var old_text_command = $('.imgCommand').html();
    $('.imgCommand').html(old_text_name);//Old text



    old_text_name = new_text_name.replaceAll('.png','');
    //$('.left-text').html($(this).attr('src'))
    $('.imgCommand').html("/imagemap place " + old_text_name + " true true 1x1")


    $('.modal').addClass("show");
    $('.show-btn').addClass("disabled");

    for (var i = 0; i < old_text_name.length; ++i) {
        $('.left-text').html(old_text_name.substr(0, old_text_name.length - i - 0));
        await sleep(2);
    }
    for (var i = 0; i < new_text_name.length; ++i) {
        $('.left-text').html(new_text_name.substr(0, i + 1));
        await sleep(2);
    }
    for (var i = 0; i < old_text_command.length; ++i) {
        $('.imgCommand').html(old_text_command.substr(0, old_text_command.length - i - 0));
        await sleep(2);
    }
    for (var i = 0; i < new_text_command.length; ++i) {
        $('.imgCommand').html(new_text_command.substr(0, i + 1));
        await sleep(2);
    }


});
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}