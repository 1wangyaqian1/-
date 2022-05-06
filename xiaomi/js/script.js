var h3 = document.querySelector('h3')
getTime();
h3.innerHTML = nowHour + '点场 倒计时 </br>(' + endHour + '点结束秒杀)'
var h = 0;
var m = 0;
var s = 0;
var timeNow;
var nowHour;
var endTime;
var endHour;
var disparity;

function getTime() {
    timeNow = new Date();
    nowHour = timeNow.getHours();
    nowYear = timeNow.getFullYear();
    nowMonth = timeNow.getMonth() + 1;
    // console.log(nowMonth);
    nowDate = timeNow.getDate();
    endHour = nowHour + 2;
    endTime = new Date(nowYear + '-' + nowMonth + '-' + nowDate + ' ' + endHour + ':00:00');
}

function seckill() {
    getTime();
    var disparity = endTime.getTime() - timeNow.getTime();
    disparity = disparity / 1000;
    disparity = parseInt(disparity);
    if (disparity > 0) {
        h = parseInt(disparity / 3600);
        m = parseInt((disparity / 60) % 60);
        s = parseInt(disparity % 60);
        if (h < 10) {
            h = '0' + h;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }

    } else {
        console.log("秒杀结束,清除计时器");
        // clearInterval(t4);

    }
    document.querySelector("#time1").innerHTML = h;
    document.querySelector("#time2").innerHTML = m;
    document.querySelector("#time3").innerHTML = s;
}
seckill();
var t4 = setInterval(function() {
    seckill();
    // location.reload()
}, 1000);