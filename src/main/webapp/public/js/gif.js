/**
 * Created by Knight on 2016/7/8.
 */


var rescueT1 = {
    "topList_l":["32px","28px","28px","65px","68px","68px","70px"],
    "leftList_l":["103px","94px","94px","121px","121px","118px","121px"],
    "topList_r":["32px","22px","22px","68px","68px","64px","68px"],
    "leftList_r":["178px","168px","168px","168px","168px","161px","164px"],
    "widthList":["60px","60px","60px","46px","46px","46px","46px"]
};


var rescueT2 = {
    "topList_l":["32px","28px","28px","56px","64px","64px","66px"],
    "leftList_l":["103px","94px","94px","129px","128px","128px","128px"],
    "topList_r":["32px","22px","22px","56px","63px","63px","65px"],
    "leftList_r":["178px","168px","168px","168px","163px","163px","163px"],
    "widthList":["60px","60px","60px","30px","30px","30px","30px"]
};


var rescueT3 = {
    "topList_l":["32px","28px","83px","83px","87px","87px","88px"],
    "leftList_l":["103px","94px","196px","196px","200px","200px","190px"],
    "topList_r":["32px","22px","83px","83px","85px","85px","86px"],
    "leftList_r":["178px","168px","228px","228px","228px","228px","220px"],
    "widthList":["60px","60px","34px","30px","30px","30px","30px"]
};


var rescueT4 = {
    "topList_l":["32px","28px","42px","42px","42px","44px","48px"],
    "leftList_l":["103px","94px","138px","138px","138px","138px","137px"],
    "topList_r":["32px","22px","42px","42px","42px","44px","48px"],
    "leftList_r":["178px","168px","175px","175px","175px","175px","173px"],
    "widthList":["60px","60px","38px","38px","38px","38px","38px"]
};

var refuseParam = {
    "topList_l":["32px","74px","82px","86px","98px","98px","98px","98px","98px","98px","100px"],
    "leftList_l":["103px","103px","103px","103px","103px","103px","103px","103px","103px","103px","103px"],
    "topList_r":["32px","74px","82px","86px","98px","98px","98px","98px","98px","98px","100px"],
    "leftList_r":["178px","178px","178px","178px","178px","178px","178px","178px","178px","178px","178px"],
    "widthList":["60px","60px","60px","60px","60px","60px","60px","60px","60px","60px","60px"]
};


var initParam = {
    "topList_l":["32px","28px","22px","22px","30px"],
    "leftList_l":["103px","94px","103px","110px","106px"],
    "topList_r":["32px","22px","22px","27px","32px"],
    "leftList_r":["176px","168px","178px","185px","179px"],
    "widthList":["60px","60px","60px","60px","60px"]
};

var gifRender = $(".render");
var headIcon1 = $(".gifjs1");
var headIcon2 = $(".gifjs2");
var delay = 250;
var interval;
var windowWidth = $(document).width();
if(windowWidth>=414){
    windowWidth = 414;
}

function GIF_init(){
    var images = $(".boat-gif-default");
    var index = 0;
    var imageNumber = images.size();
    var list = initParam;

    interval = setInterval(function(){
        gifRender.attr("src","http://res.ys-1v1.com/res/boat_gif_default_"+(index+1)+".png?imageMogr2/thumbnail/500x/strip");
        headIcon1.css({
            "top":windowWidth*(parseInt(list.topList_l[index])/320),
            "left":windowWidth*(parseInt(list.leftList_l[index])/320),
            "width":windowWidth*(parseInt(list.widthList[index])/320)});
        headIcon2.css({
            "top":windowWidth*(parseInt(list.topList_r[index])/320),
            "left":windowWidth*(parseInt(list.leftList_r[index])/320),
            "width":windowWidth*(parseInt(list.widthList[index])/320)});
        index++;
        if(index == imageNumber){
            index = 0;
        }
    },delay);
}

function upload_init(){
    var list = initParam;
    headIcon1.css({
        "top":windowWidth*(parseInt(list.topList_l[0])/320),
        "left":windowWidth*(parseInt(list.leftList_l[0])/320),
        "width":windowWidth*(parseInt(list.widthList[0])/320)});
    headIcon2.css({
        "top":windowWidth*(parseInt(list.topList_r[0])/320),
        "left":windowWidth*(parseInt(list.leftList_r[0])/320),
        "width":windowWidth*(parseInt(list.widthList[0])/320)});
    $(".btn-img-add,#plan").css({
        "top":windowWidth*(parseInt(list.topList_l[0])/320),
        "left":windowWidth*(parseInt(list.leftList_l[0])/320),
        "width":windowWidth*(parseInt(list.widthList[0])/320),
        "height":windowWidth*(parseInt(list.widthList[0])/320)});

    $(".btn-img-add1,#plan1").css({
        "top":windowWidth*(parseInt(list.topList_r[0])/320),
        "left":windowWidth*(parseInt(list.leftList_r[0])/320),
        "width":windowWidth*(parseInt(list.widthList[0])/320),
        "height":windowWidth*(parseInt(list.widthList[0])/320)});
}

$(window).resize(function(){
    windowWidth = $(document).width();
    if(windowWidth>=414){
        windowWidth = 414;
    }
    upload_init();
});

function GIF_rescue(){
    if(boatType==1){
        GIF_START("boat-gif-rescue",rescueT1)
    } else if(boatType==2){
        GIF_START("boat-gif-rescue",rescueT2)
    } else if(boatType==3){
        GIF_START("boat-gif-rescue",rescueT3)
    }else if(boatType==4){
        GIF_START("boat-gif-rescue",rescueT4)
    }
}

function GIF_rescue_t1(){
    GIF_START("boat-gif-rescue-t1",rescueT1)
}
function GIF_rescue_t2(){
    GIF_START("boat-gif-rescue-t2",rescueT2)
}
function GIF_rescue_t3(){
    GIF_START("boat-gif-rescue-t3",rescueT3)
}
function GIF_rescue_t4(){
    GIF_START("boat-gif-rescue-t4",rescueT4)
}
function GIF_refuse(){
    GIF_START("boat-gif-refuse",refuseParam)
}

function GIF_START(imagesClass,paramList){
    clearInterval(interval);
    var images = $("."+imagesClass);
    var imageNumber = images.size();
    var list = paramList;
    var index = 0;
    interval = setInterval(function(){

        gifRender.attr("src",images.eq(index).attr("src"));
        headIcon1.css({
            "top":windowWidth*(parseInt(list.topList_l[index])/320),
            "left":windowWidth*(parseInt(list.leftList_l[index])/320),
            "width":windowWidth*(parseInt(list.widthList[index])/320)});
        headIcon2.css({
            "top":windowWidth*(parseInt(list.topList_r[index])/320),
            "left":windowWidth*(parseInt(list.leftList_r[index])/320),
            "width":windowWidth*(parseInt(list.widthList[index])/320)});

        //最后一帧重复逻辑
        if(index==imageNumber-1){
            index--;
            GIF_END(imagesClass,paramList,index);
        }
        else
            index++;


        //播放完就停止
        //if(index == imageNumber) clearInterval(interval);
    },delay);
}

function GIF_END(imagesClass,paramList,index){
    clearInterval(interval);
    var images = $("."+imagesClass);
    var imageNumber = images.size();
    var list = paramList;

    interval = setInterval(function(){
        gifRender.attr("src",images.eq(index).attr("src"));
        headIcon1.css({
            "top":windowWidth*(parseInt(list.topList_l[index])/320),
            "left":windowWidth*(parseInt(list.leftList_l[index])/320),
            "width":windowWidth*(parseInt(list.widthList[index])/320)});
        headIcon2.css({
            "top":windowWidth*(parseInt(list.topList_r[index])/320),
            "left":windowWidth*(parseInt(list.leftList_r[index])/320),
            "width":windowWidth*(parseInt(list.widthList[index])/320)});

        //最后一帧重复逻辑
        if(index==imageNumber-1)index--;
        else index++;

    },500);
}