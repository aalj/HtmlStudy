$(document).ready(function () {
    // alert("处出现什么情况");
    var $jqueryP = $(".jquery_doc");
    $jqueryP.click(function () {
        $(".te").text("修改P内容");
    });
    $jqueryP.mouseenter(function () {
        // alert("鼠标移入");
        $(this).show();
    });
    $jqueryP.mouseleave(function () {
        $(this).hide();
        // alert("鼠标移开");
    });
});

