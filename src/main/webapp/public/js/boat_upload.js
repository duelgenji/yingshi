/**
 * Created by qqy on 15/12/18.
 */

// 初始化裁剪窗口
$("#clipArea").photoClip({
    width: 170,
    height: 170,
    file: "#file",
    view: "#hit",
    ok: "#clipBtn",
    outputType: "png",
    clipFinish: function (dataURL) {
        $('#hit').attr('src', dataURL);
        saveImageInfo($('#hit'), $('#upload-btn'), $('#myModal'), 90, $("#imgUrl"), $('#plan'), "myCanvas");
    }
});

$("#clipArea1").photoClip({
    width: 188,
    height: 188,
    file: "#file1",
    view: "#hit1",
    ok: "#clipBtn1",
    outputType: "png",
    clipFinish: function (dataURL) {
        $('#hit1').attr('src', dataURL);
        saveImageInfo($('#hit1'), $('#upload-baby'), $('#myModal1'), 67, $("#imgUrl1"), $('#plan1'), "myCanvas1");
    }
});

function clip() {
    $('#myModal').modal('show');
}

function clip1() {
    $('#myModal1').modal('show');
}

// 保存图片
function saveImageInfo(content, upbutton, upmodal, size, imgurl, plan, canvasname) {
    //var img_data = $('#hit').attr('src');
    var img_data = content.attr('src');
    if (img_data == "") {
        console.log('null');
    }
    render(img_data, size, plan, canvasname);

    imgurl.val(img_data);
    upbutton.css("z-index", "-1");
    upmodal.modal('hide');
}

// 获取文件扩展名
function getFileExt(str) {
    var strName = /\.[^\.]+$/.exec(str);
    return strName;
}

// 渲染 Image 缩放尺寸
function render(src, size, plan, cavansname) {
    var MAX_HEIGHT = size;  //Image 缩放尺寸
    // 创建一个 Image 对象
    var image = new Image();

    // 绑定 load 事件处理器，加载完成后执行
    image.onload = function () {
        // 获取 canvas DOM 对象
        var canvas = document.getElementById(cavansname);
        // 如果高度超标
        if (image.height > MAX_HEIGHT) {
            // 宽度等比例缩放 *=
            image.width *= MAX_HEIGHT / image.height;
            image.height = MAX_HEIGHT;
        }
        // 获取 canvas的 2d 环境对象,
        // 可以理解Context是管理员，canvas是房子
        var ctx = canvas.getContext("2d");
        // canvas清屏
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image.width;        // 重置canvas宽高
        canvas.height = image.height;
        // 将图像绘制到canvas上
        ctx.drawImage(image, 0, 0, image.width, image.height);
        // !!! 注意，image 没有加入到 dom之中

        var dataurl = canvas.toDataURL("image/png");
        var imagedata = encodeURIComponent(dataurl);
        plan.attr('data-src', dataurl);
        plan.show();
    };
    // 设置src属性，浏览器会自动加载。
    // 记住必须先绑定render()事件，才能设置src属性，否则会出同步问题。
    image.src = src;
}

$('#save').on('click', function () {
    //var title = $('#title').val();
    var description = $('#description').val();
    var avatarUrl1 = $('#imgUrl').val().split(',')[1];
    var avatarUrl2 = $('#imgUrl1').val().split(',')[1];
    var data = {
        "title": "宝妈",
        "avatar1": avatarUrl1,
        "avatar2": avatarUrl2
    };
    $.ajax({
        type: 'POST',
        url: commonUrl + 'wx/generateBoat',
        data: data,
        success: function (data) {
            console.log(data);
        },
        error: function () {
            $('#my-message').text("提交失败");
            $('#textModal').modal('show');
        }
    });
});
