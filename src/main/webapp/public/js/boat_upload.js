/**
 * Created by qqy on 15/12/18.
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}

// 初始化裁剪窗口
var clipArea = new bjj.PhotoClip("#clipArea", {
    size: [170, 170], // 截取框的宽和高组成的数组。默认值为[260,260]
    outputSize: [0, 0], // 输出图像的宽和高组成的数组。默认值为[0,0]，表示输出图像原始大小
    outputType: "png", // 指定输出图片的类型，可选 "jpg" 和 "png" 两种种类型，默认为 "jpg"
    file: "#file", // 上传图片的<input type="file">控件的选择器或者DOM对象
    source: "", // 需要裁剪图片的url地址。该参数表示当前立即开始裁剪的图片，不需要使用file控件获取。注意，该参数不支持跨域图片。
    view: "#hit", // 显示截取后图像的容器的选择器或者DOM对象
    ok: "#clipBtn", // 确认截图按钮的选择器或者DOM对象
    loadStart: function(file) {}, // 开始加载的回调函数。this指向 fileReader 对象，并将正在加载的 file 对象作为参数传入
    loadComplete: function(src) {}, // 加载完成的回调函数。this指向图片对象，并将图片地址作为参数传入
    loadError: function(event) {}, // 加载失败的回调函数。this指向 fileReader 对象，并将错误事件的 event 对象作为参数传入
    clipFinish: function(dataURL) {
        $('#hit').attr('src', dataURL);
        saveImageInfo($('#hit'), $('#upload-btn'), $('#myModal'), 90, $("#imgUrl"), $('#plan'), "myCanvas");

    } // 裁剪完成的回调函数。this指向图片对象，会将裁剪出的图像数据DataURL作为参数传入
});

var clipArea1 = new bjj.PhotoClip("#clipArea1", {
    size: [170, 170], // 截取框的宽和高组成的数组。默认值为[260,260]
    outputSize: [0, 0], // 输出图像的宽和高组成的数组。默认值为[0,0]，表示输出图像原始大小
    outputType: "png", // 指定输出图片的类型，可选 "jpg" 和 "png" 两种种类型，默认为 "jpg"
    file: "#file1", // 上传图片的<input type="file">控件的选择器或者DOM对象
    source: "", // 需要裁剪图片的url地址。该参数表示当前立即开始裁剪的图片，不需要使用file控件获取。注意，该参数不支持跨域图片。
    view: "#hit1", // 显示截取后图像的容器的选择器或者DOM对象
    ok: "#clipBtn1", // 确认截图按钮的选择器或者DOM对象
    clipFinish: function(dataURL) {
        $('#hit1').attr('src', dataURL);
        saveImageInfo($('#hit1'), $('#upload-baby'), $('#myModal1'), 90, $("#imgUrl1"), $('#plan1'), "myCanvas1");

    } // 裁剪完成的回调函数。this指向图片对象，会将裁剪出的图像数据DataURL作为参数传入
});

//$("#clipArea1").photoClip({
//    width: 170,
//    height: 170,
//    file: "#file1",
//    view: "#hit1",
//    ok: "#clipBtn1",
//    outputType: "png",
//    clipFinish: function (dataURL) {
//        $('#hit1').attr('src', dataURL);
//        saveImageInfo($('#hit1'), $('#upload-baby'), $('#myModal1'), 67, $("#imgUrl1"), $('#plan1'), "myCanvas1");
//    }
//});

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


var isSaving = false;

$('#save').on('click', function () {
        //var title = $('#title').val();
    if(isSaving) return;
    isSaving = true;
    var description = $('#description').val();
    var avatarUrl1 = $('#imgUrl').val().split(',')[1];
    var avatarUrl2 = $('#imgUrl1').val().split(',')[1];
    //if(!avatarUrl1 || !avatarUrl2){
    //    alert("需要上传两张头像噢~");
    //    isSaving = false;
    //    return;
    //}
    $('#textModal').modal('show');

    var data = {
        "avatar1": avatarUrl1,
        "avatar2": avatarUrl2,
        "openId": GetQueryString("openId")
    };
    $(".my-modal-footer").hide();
    $.ajax({
        type: 'POST',
        url: commonUrl + 'wx/generateBoat',
        data: data,
        success: function (data) {
            $('#textModal').modal('hide');

            if(data.success ==1){
                self.location = "boat_show.html?boat="+data.boat;
            }else{
                $('#my-message').text("提交失败");
                isSaving = false;
                $(".my-modal-footer").show();
            }

        },
        error: function () {
            $('#my-message').text("提交失败");
            isSaving = false;
            $(".my-modal-footer").show();
        }
    });
});

$('#reset').on('click', function () {

    location.reload(true);

});