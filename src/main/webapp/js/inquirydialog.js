/**
 * Created by qqy on 15/10/28.
 */

var imGroupId;
$(document).ready(function () {
    if (getParam('imGroupId') == null) {
        imGroupId = getData('imGroupId');
    } else {
        saveData('imGroupId', getParam('imGroupId'));
        imGroupId = getParam('imGroupId');
    }
    ajax(0);
});
function ajax(page) {
    $.ajax({
        type: 'GET',
        //url: commonUrl + 'im/queryRecords?groupId=142591151990374988&type=user&size=2&page=' + page,
        url: commonUrl + 'im/queryRecords?groupId=' + imGroupId + '&type=user&size=20&page=' + page,
        success: function (data) {
            if (data.ret_values.content.length != 0) {
                var listTemple = Handlebars.compile($("#dialog").html());
                Handlebars.registerHelper('compare', function (v1, options) {
                    if (v1[0]) {
                        return options.fn(this);
                    }
                });
                var height1  = $('#recordsList').outerHeight();
                $('#recordsList').prepend(listTemple(data.ret_values));
                var height2  = $('#recordsList').outerHeight();
                var heightd = parseInt(height2) - parseInt(height1);
                $(document).scrollTop(heightd);
                if (page == 0) {
                    setTimeout(function () {
                        $(document).scrollTop($(document).height())
                    }, 10);
                }
            } else {
                return;
            }
        },
        error: function () {
            alert('服务器请求异常')
        }
    })
}
$(document).scroll(function () {
    var $this = $(this);
    var scrollTop = $this.scrollTop();//滚动到顶部
    var page = $('#recordsList').find('input').attr('id');
    if (scrollTop == 0) {
        ajax(parseInt(page) + 1);
    }
    //if (scrollTop >= $(document).height() - $(window).height() && page != 0) {
    //    console.log('底部' + page);
    //    var qpage = page - 1;
    //    reload(qpage);
    //}
});

//$(document).on('scroll', '#recordsList', function () {
//    var $this = $(this),
//        viewH = $this.height(),//可见高度
//        contentH = $this.get(0).scrollHeight,//内容高度
//        scrollTop = $this.scrollTop();//滚动高度
//    console.log(viewH + '' + contentH + '' + scrollTop);
//})

$(document).on('click', '.id-img', function () {
    var $newImage = $(this).find('img');
    var src = $newImage.attr('src');
    var $image = $('#image-modal').find('img');
    $image.attr('src', src);
    var size = $newImage.width() - $newImage.height();
    if (size < 0 && $newImage[0].naturalWidth < $(window).width()) {
        var width = $newImage.width() / $newImage.height() * $(window).height();
        $image.css('height', '100%').css('left', '50%').css('margin-left', '-' + width / 2 + 'px');
    }
    else {
        var height = $newImage.height() / $newImage.width() * $(window).width();
        $image.css('width', '100%').css('top', '50%').css('margin-top', '-' + height / 2 + 'px');
    }
    $('#image-modal').show();
});

$(document).on('click', '#image-modal', function () {
    $('#image-modal').hide();
    $('#image-modal img').attr('style', '');
});
function toSub() {

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
    $.ajax({
        type: 'POST',
        url: commonUrl + 'im/canMessageResend/' + memberId,
        success: function (data) {
            console.log(data);
            if (data.ret_code == 0) {
                location.href = 'non-member_inquiry.html?memberId=' + memberId + '&imGroupId=' + imGroupId;
            } else {
                $('#my-message').text(data.message);
                $('#myModal').modal('show');
            }
        },
        error: function () {
            $('#my-message').text('服务器请求失败');
            $('#myModal').modal('show');
        }

    })
}


