/**
 * Created by qqy on 15/11/9.
 */

function edit() {
    $('#pm-name').hide();
    $('#pm-input').show();
}
function del() {
    $("#input").val("");
}

//图片上传
jQuery(function () {

    var $ = jQuery,
        $list = $('#avatar'),
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
        //server: 'im/uploadMedicalPic',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#chooseImage',

        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },

        //验证文件总数量, 超出则不允许加入队列
        //fileNumLimit: 3,

        //设置文件上传域的name，默认file
        fileVal: 'pic',

        //去重， 根据文件名字、文件大小和最后修改时间来生成hash Key
        duplicate: true
    });

    // 当有文件添加进来的时候
    //uploader.on('fileQueued', function (file) {
    //    var $img = $list.find('img');
    //
    //    // 创建缩略图
    //    uploader.makeThumb(file, function (error, src) {
    //        if (error) {
    //            $img.replaceWith('<span>不能预览</span>');
    //            return;
    //        }
    //
    //        $img.attr('src', src);
    //    }, thumbnailWidth, thumbnailHeight);
    //});

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file, response) {
        if (response.ret_code == 0) {

            var $img = $list.find('img');
            // 创建缩略图
            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                $img.attr('src', src);
            }, thumbnailWidth, thumbnailHeight);

            $('#myModal').modal('show');
            $('#imgUrl').val(response.ret_values);
        }
        else {
            $('#my-message').text(response.ret_values);
            $('#myModal').modal('show');
        }
    });

    // 文件上传失败，现实上传出错。
    uploader.on('uploadError', function (file) {
        $('#my-message').text('上传失败');
        $('#myModal').modal('show');
        $('#imgUrl').val(file.id);
    });
});

$(document).ready(function () {
    var name = getData('name');
    var memberId = getData('memberId');
    var photoUrl = getData('photoUrl');
    var memberType = getData('memberType');
    $('#userName').html(name);
    $('#memberId').html(memberId);
    $('#photoUrl').html(photoUrl);
    if (memberType == 1) {
        $('#identification').html('已认证');
    } else {
        $('#identification').html('未认证');
    }
    $('#pm-name').html(name);
    if (photoUrl != "") {
        $("#portrait").attr("src", photoUrl)
    }

    $(document).on('click', '#updateInfo', function () {
        var json = {};
        json.name = $('#pm-name').html();
        json.photoUrl = $("#imgUrl").attr('value');
        console.log(json);
        $.ajax({
            type: 'POST',
            data: json,
            url: commonUrl + "users/app/updateInformations/" + getData('primaryKey'),
            success: function (data) {
                //console.log(data);
                alert('修改成功');
            },
            error: function (data) {
                alert('修改失败');
            }
        })
    });
})