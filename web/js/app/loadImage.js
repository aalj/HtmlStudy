var page = 1;
var isscroll = true;
$(document).ready(function () {
    loadPage(page);

    window.onscroll = function () {
        if (scrollSide() && isscroll) {
            isImgLoad(function () {
                isscroll = false;
                // 加载完成
                page++;
                loadPage(page);
            });
        }
    }
});


function loadPage(page) {
    //访问网络获取全部的图片地址
    getLoadImage(page, function (data) {
        //根据图片地址加载相关的内容
        initImageDiv(data);

        //计算排列图片
        isImgLoad(function () {
            // 加载完成
            imgLocation();
        });
    });
}


function scrollSide() {
    var box = $(".box");
    var lastBoxHeight = box.last().get(0).offsetTop + Math.floor(box.last(0).height() / 2);
    var documentHeight = $(document).width();
    console.log("documentHeight   " + documentHeight);
    var scrollHeight = $(window).scrollTop();
    console.log("scrollHeight  " + scrollHeight);
    return (lastBoxHeight < (documentHeight + scrollHeight)) ? true : false;
}

function getLoadImage(page, success) {
    var url = "https://gank.io/api/data/福利/50/" + page;
    $.get(url, "", function (data) {
        console.log(data);
        var urlArr = [];
        data.results.forEach(function (value) {
            urlArr.push(value.url);
        });
        success(urlArr);
    });
}

function initImageDiv(data) {
    data.forEach(function (value) {
        var box = $("<div>").addClass("box").appendTo("#imaContent");
        var content = $("<div>").addClass("content").appendTo(box);
        var image = $("<img>").addClass("myImg").attr("src", value).on("click",function () {
            alert($(this).attr("href"))
        });
        image.appendTo(content);
    })
}

function imgLocation() {
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width() / boxWidth);
    var boxArr = [];
    box.each(function (index, value) {
        var boxHeight = box.eq(index).height();
        if (index < num) {
            //第一行显示
            boxArr[index] = boxHeight;
            // console.log(boxHeight);
        } else {
            //不是第一行显示内容
            var minBoxHeight = Math.min.apply(null, boxArr);
            // console.log("最小高度" + minBoxHeight);
            var minBoxIndex = $.inArray(minBoxHeight, boxArr);
            // console.log("最小box的索引" + minBoxIndex);
            $(value).css({
                "position": "absolute",
                "top": minBoxHeight,
                "left": box.eq(minBoxIndex).position().left
            });
            boxArr[minBoxIndex] += box.eq(index).height();

        }
    });
    isscroll = true;
}

//******************************************************************
//判断所有图片是否加载结束
var t_img; // 定时器
var isLoad = true; // 控制变量
// 判断图片加载的函数
function isImgLoad(callback) {
    // 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
    // 查找所有封面图，迭代处理
    $(".myImg").each(function () {
        // 找到为0就将isLoad设为false，并退出each
        if (this.height === 0) {
            isLoad = false;
            return false;
        }
    });
    // 为true，没有发现为0的。加载完毕
    if (isLoad) {
        clearTimeout(t_img); // 清除定时器
        // 回调函数
        callback();
        // 为false，因为找到了没有加载完成的图，将调用定时器递归
    } else {
        isLoad = true;
        t_img = setTimeout(function () {
            isImgLoad(callback); // 递归扫描
        }, 500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
    }
}

//******************************************************************
