/**
 * Created by cathleenzhang on 16/3/8.
 */
var commonUrl = "http://xlab-tech.com:45675/fullway-activity/";

var hammer = '';
var currentIndex = 0;
var body_width = $('body').width();


// 初始化裁剪窗口
$("#clipArea1").photoClip({
    width: body_width * 0.8125,
    height: body_width * 0.8125,
    file: "#file1",
    view: "#hit1",
    ok: "#clipBtn1",
    outputType: "png",
    clipFinish: function (dataURL) {
        $('#hit1').attr('src', dataURL);
        saveImageInfo1();
    }
});

$("#clipArea2").photoClip({
    width: body_width * 0.8125,
    height: body_width * 0.8125,
    file: "#file2",
    view: "#hit2",
    ok: "#clipBtn2",
    outputType: "png",
    clipFinish: function (dataURL) {
        $('#hit2').attr('src', dataURL);
        saveImageInfo2();
    }
});

function file1Click() {
    $('#myModal1').modal('show');
}
function file2Click() {
    $('#myModal2').modal('show');
}


// 保存图片
function saveImageInfo1() {
    var img_data1 = $('#hit1').attr('src');
    if (img_data1 == "") {
        console.log('null');
    }
    render1(img_data1);// dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
    $('#imgUrl1').val(img_data1);
    $("#uploadpic1").css("z-index", "-1");
    $('#myModal1').modal('hide');
}

function saveImageInfo2() {
    var img_data2 = $('#hit2').attr('src');
    if (img_data2 == "") {
        console.log('null');
    }
    render2(img_data2);// dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
    $('#imgUrl2').val(img_data2);
    $("#uploadpic2").css("z-index", "-1");
    $('#myModal2').modal('hide');
}


// 渲染 Image 缩放尺寸
function render1(src) {
    var MAX_HEIGHT = 200;  //Image 缩放尺寸
    // 创建一个 Image 对象
    var image1 = new Image();

    // 绑定 load 事件处理器，加载完成后执行
    image1.onload = function () {
        // 获取 canvas DOM 对象
        var canvas1 = document.getElementById("myCanvas1");
        // 如果高度超标
        if (image1.height > MAX_HEIGHT) {
            // 宽度等比例缩放 *=
            image1.width *= MAX_HEIGHT / image1.height;
            image1.height = MAX_HEIGHT;
        }
        // 获取 canvas的 2d 环境对象,
        // 可以理解Context是管理员，canvas是房子
        var ctx1 = canvas1.getContext("2d");
        // canvas清屏
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        canvas1.width = image1.width;        // 重置canvas宽高
        canvas1.height = image1.height;
        // 将图像绘制到canvas上
        ctx1.drawImage(image1, 0, 0, image1.width, image1.height);
        // !!! 注意，image 没有加入到 dom之中

        var dataurl1 = canvas1.toDataURL("image/png");
        var imagedata1 = encodeURIComponent(dataurl1);
        $('#plan1').attr('data-src', dataurl1);
        $('#plan1').show();
    };
    // 设置src属性，浏览器会自动加载。
    // 记住必须先绑定render()事件，才能设置src属性，否则会出同步问题。
    image1.src = src;
}

function render2(src) {
    var MAX_HEIGHT = 200;  //Image 缩放尺寸
    // 创建一个 Image 对象
    var image2 = new Image();

    // 绑定 load 事件处理器，加载完成后执行
    image2.onload = function () {
        // 获取 canvas DOM 对象
        var canvas2 = document.getElementById("myCanvas2");
        // 如果高度超标
        if (image2.height > MAX_HEIGHT) {
            // 宽度等比例缩放 *=
            image2.width *= MAX_HEIGHT / image2.height;
            image2.height = MAX_HEIGHT;
        }
        // 获取 canvas的 2d 环境对象,
        // 可以理解Context是管理员，canvas是房子
        var ctx2 = canvas2.getContext("2d");
        // canvas清屏
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        canvas2.width = image2.width;        // 重置canvas宽高
        canvas2.height = image2.height;
        // 将图像绘制到canvas上
        ctx2.drawImage(image2, 0, 0, image2.width, image2.height);
        // !!! 注意，image 没有加入到 dom之中

        var dataurl2 = canvas2.toDataURL("image/png");
        var imagedata2 = encodeURIComponent(dataurl2);
        $('#plan2').attr('data-src', dataurl2);
        $('#plan2').show();
    };
    // 设置src属性，浏览器会自动加载。
    // 记住必须先绑定render()事件，才能设置src属性，否则会出同步问题。
    image2.src = src;
}


//上传图片
$('#imgsave').on('click', function () {
    var pict1 = $('#imgUrl1').val();
    var pict2 = $('#imgUrl2').val();
    if (pict1.length === 0 || pict2.length === 0) {
        alert('请上传完整哦~');
    } else {
        document.getElementById('loader').style.display = 'block';

        var data = new FormData();
        data.append("pict1", pict1.split(',')[1]);
        data.append("pict2", pict2.split(',')[1]);
        $.ajax({
            type: 'POST',
            url: commonUrl + 'pictureUpload/upload',
            data: data,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                $('#loader').shCircleLoader('destroy');
                location.href = "weixin_babylooks_voteresult.html?id=" + data.id;
            },
            error: function () {
                alert('提交失败');
            }
        });
    }
});






