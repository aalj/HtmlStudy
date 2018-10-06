$(document).ready(function () {
    $("#btn1").click(function () {
        alert("你是谁: "+$("#text_p").text());
    });
    $("#btn2").click(function () {
        alert("你是谁: "+$("#text_p").html());
    });
    $("#get_input_val").click(function () {
        alert("我上面的input你的内容是什么: "+ $("#input_text").val())
    });
});