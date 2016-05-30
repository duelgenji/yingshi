/**
 * Created by scf on 15/11/24.
 */

$(function () {

    $("#datescroll").mobiscroll().date({
        display: "inline",
        theme: "android-holo-light",
        lang: "zh",
        fixedWidth: [100, 100, 100],
        rows: 5,
//                defaultValue:new Date(2015,0,1),
        startYear: 1900,
        endYear: 2050,
        cancelText: null,
        dateFormat: 'yy/mm/dd', //返回结果格式化为年月格式
        // wheels:[], 设置此属性可以只 显示年月，此处演示，就用下面的onBeforeShow方法,另外也可以用treelist去实现
        onBeforeShow: function (inst) {
            inst.settings.wheels[0].length > 3 ? inst.settings.wheels[0].pop() : null;

        },


        onChange: function (valueText) {
            var ageDiff;
            var strBirthdayArr = valueText.split("/");
            var birthYear = strBirthdayArr[0];
            var birthMouth = strBirthdayArr[1];
            var birthDay = strBirthdayArr[2];


            var d = new Date();
            var nowYear = d.getYear() + 1900;
            var nowMouth = d.getMonth() + 1;
            var nowDay = d.getDate();

//                    console.log(nowYear);
//                    console.log(nowMouth);
//                    console.log(nowDay);

            if (nowYear == birthYear) {
                if (nowMouth == birthMouth){
                    if(nowDay >= birthDay){
                        ageDiff = 1;
                    }
                    else{
//                                ageDiff = 0;
                        alert ("您选择的日期超过当前日期");
                        window.location.reload();
                    }
                }else{
                    if((nowMouth - birthMouth) > 0){
                        ageDiff = 1;
                    }else{
//                                ageDiff = 0;
                        alert ("您选择的日期超过当前日期");
                        window.location.reload();
                    }
                }
            }
            else {
                var Diff = nowYear - birthYear; //年之差
                if (Diff > 0) {
                    ageDiff = Diff + 1
                } else {
//                            ageDiff = 0;
                    alert ("您选择的日期超过当前日期");
                    window.location.reload();
                }

            }
            $('#age').html(ageDiff);

        },
    });
});