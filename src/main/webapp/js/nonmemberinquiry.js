/**
 * Created by qqy on 15/10/23.
 */

//$('#scroller').css('width', 155 * 4 + 'px');
//医生团队左右滑动操作
var myScroll;

function loaded(length) {
    $('#scroller').css('width', (112 * length) + 'px');
    myScroll = new IScroll('#wrapper', {scrollX: true, scrollY: false, mouseWheel: true, click: true});
}

var count = 0;
//图片上传
jQuery(function () {

    var $ = jQuery,
        $list = $('#img-list'),
    // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

    // 缩略图大小
        thumbnailWidth = 50 * ratio,
        thumbnailHeight = 50 * ratio,

    // Web Uploader实例
        uploader;

    // 初始化Web Uploader
    uploader = WebUploader.create({
        compress: {
            width: 500,

            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 90,

            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: false,

            // 是否允许裁剪。
            crop: false,

            // 是否保留头部meta信息。
            preserveHeaders: true,

            // 如果发现压缩后文件大小比原来还大，则使用原来图片
            // 此属性可能会影响图片自动纠正功能
            noCompressIfLarger: false,

            // 单位字节，如果图片大小小于此值，不会采用压缩。
            compressSize: 2048
        },

        // 自动上传。
        auto: true,

        // swf文件路径
        swf: 'Uploader.swf',

        // 文件接收服务端。
        server: commonUrl + 'im/uploadMedicalPic',

        // 选择文件的按钮。可选。
        pick: {
            id: '#chooseImage',
            innerHTML: 'chinese',
            multiple: false
        },

        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },

        //验证文件总数量, 超出则不允许加入队列
        fileNumLimit: 3,

        //设置文件上传域的name，默认file
        fileVal: 'pic',

        //去重， 根据文件名字、文件大小和最后修改时间来生成hash Key
        duplicate: true
    });

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        count = count + 1;
        if (count == 3) {
            $('#chooseImage').hide();
        }
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail" >' +
                '<img>' +
                '<input type=hidden id="input' + file.id + '" />' +
                '</div>' +
                '<span class="ni-close" id="close' + file.id + '" onclick="removeFile(\'' + file.id + '\')"></span>'
            ),

            $img = $li.find('img');

        $list.append($li);

        //$('#chooseImage').hide();

        //删除文件队列中的文件
        $list.on("touchstart click", ".ni-close", function () {
            uploader.removeFile(file);
        });

        // 创建缩略图
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
    });

    // 文件上传过程中创建进度条实时显示。
    //uploader.on('uploadProgress', function (file, percentage) {
    //    var $li = $('#' + file.id),
    //        $percent = $li.find('.progress span');
    //
    //    // 避免重复创建
    //    if (!$percent.length) {
    //        $percent = $('<p class="progress"><span></span></p>')
    //            .appendTo($li)
    //            .find('span');
    //    }
    //
    //    $percent.css('width', percentage * 100 + '%');
    //});

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file, response) {
        if (response.ret_code == 0) {
            $('#my-message').text(response.message);
            $('#myModal').modal('show');
            $('#input' + file.id).val(response.ret_values);
        }
        else {
            removeFile(file.id);
            $('#chooseImage').show();
            $('#my-message').text(response.message);
            $('#myModal').modal('show');
        }
    });

    // 文件上传失败，现实上传出错。
    uploader.on('uploadError', function (file) {
        removeFile(file.id);
        $('#chooseImage').show();
        $('#my-message').text('上传失败');
        $('#myModal').modal('show');
        //$('#myModal').modal('show');
        //$('#input' + file.id).val(file.id);
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    //uploader.on('uploadComplete', function (file) {
    //    $('#' + file.id).find('.progress').remove();
    //});

});

// 负责view的销毁
function removeFile(id) {
    var $li = $('#' + id);
    var $close = $('#close' + id);
    var $input = $('#input' + id);
    $li.remove();
    $close.remove();
    $input.remove();
    $('#chooseImage').show();
    count = count - 1;
}

function sendText() {
    var picUrl = [];
    $('input[type=hidden]').each(function (index) {
        picUrl.push($(this).val());
        //console.log($(this).val());
        //picUrl = $(this).val();
    });
    if (parseInt($('#msg').val().indexOf("请详细描述您的症状，")) >= 0) {
        $('#msg').text("");
    }
    if ($('#msg').val().length > 200) {
        $('#my-message').text('内容长度不能超过200个字');
        $('#myModal').modal('show');
        return
    }
    if ($('#msg').val().length < 5) {
        $('#my-message').text('请给出超过5个字的病症描述');
        $('#myModal').modal('show');
        return
    }
    var target = [];
    var memberId;
    var imGroupId;
    if (getParam('memberId') == null) {
        memberId = getData('memberId');
    } else {
        saveData('memberId', getParam('memberId'));
        memberId = getParam('memberId');
    }
    if (getParam('imGroupId') == null) {
        imGroupId = getData('imGroupId');
    } else {
        saveData('imGroupId', getParam('imGroupId'));
        imGroupId = getParam('imGroupId');
    }
    target[0] = imGroupId;
    var textMessage = {
        "target_type": "chatgroups",
        "target": target,
        "msg": {
            "type": "txt",
            "msg": $('#msg').val()
        },
        "from": memberId,
        "ext": {
            "picUrl": picUrl
        }
    };
    $.ajax({
        type: 'POST',
        url: commonUrl + 'im/sendTxtMessage',
        data: JSON.stringify(textMessage),
        contentType: 'application/json',
        success: function (data) {
            //console.log(data);
            if (data.ret_code === 0) {
                //原生跳转等待页面
                location.href = 'inquiry_waiting.html?memberId=' + memberId + '&imGroupId=' + imGroupId;
                return;
            }
            else {
                $('#my-message').text(data.message);
                $('#myModal').modal('show');
            }
        },
        error: function () {
            $('#my-message').text('服务器请求失败');
            $('#myModal').modal('show');
        }

    });
}

//window.document.oncontextmenu = function(){ return false; };
function textAreaonfocus() {
    var message = $('#msg').val();
    if (parseInt(message.indexOf("详细描述您的症状")) > 0) {
        $('#msg').text("");
    }
}

//针对添加操作中的简介和备注，textarea失去焦点且内容为空时，显示提示信息
function lostAddFocus() {
    var message = $('#msg').val();
    var textarea_value = message;
    console.log(textarea_value+"111");
    if (textarea_value == "") {
        $('#msg').text('请详细描述您的症状，如：\n' +
            '           \"医生您好，我的症状是……\"');
    }
}

$(document).on('keyup', '#msg', function (e) {
    var size = $('#msg').val().length;
    if (e && e.keyCode == 8) {  //删除按钮
        console.log($('#msg').val());
        if ($('#msg').val() === "" || $('#msg').val() === null)
            $('#size').html(0);
        else {
            $('#size').html(size + 1);
        }
        return;
    } else {
        if (size >= 200) {
            console.log(size);
            $('#my-message').text('最多只能输入200个字');
            $('#myModal').modal('show');
            var text = $('#msg').val().substring(0, 199);
            $('#msg').val(text);
            $('#size').html(200);
            return;
        } else {
            $('#size').html(size);
        }
    }


    function bindChangeHandler(input, fun) {
        if ("onpropertychange" in input) {//IE6、7、8，属性为disable时不会被触发
            input.onpropertychange = function () {
                if (window.event.propertyName == "value") {
                    if (fun) {
                        fun.call(this, window.event);
                    }
                }
            }
        } else {
            //IE9+ FF opera11+,该事件用js改时不变值会触发，自动下拉框选值时不会触发
            input.addEventListener("input", fun, false);
        }
    }

    //使用
    var $test = $('#msg');
    bindChangeHandler($test[0], function () {
        var size = $('#msg').val().length;
        if (e && e.keyCode == 8) {  //删除按钮
            console.log($('#msg').val().length);
            if ($('#msg').val() === "" || $('#msg').val() === null)
                $('#size').html(0);
            else {
                if (size == 198) {
                    $('#size').html(size + 1);
                } else {
                    $('#size').html(size);
                }
            }
            return;
        } else {
            if (size >= 200) {
                console.log(size);
                $('#my-message').text('最多只能输入200个字');
                $('#myModal').modal('show');
                var text = $('#msg').val().substring(0, 199);
                $('#msg').val(text);
                $('#size').html(200);
                return;
            } else {
                $('#size').html(size + 1);
            }
        }
    });

});