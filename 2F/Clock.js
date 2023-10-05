$(function(){
    $(".circle").css('background','rgba(0,0,0,0) url(../2F/img/g4G98N1.png) 0% 0% no-repeat');
    $(".circle").css('background-position',' center center');
});

function setTime() {
    let date = new Date();
    let currentHour = date.getHours();
    let currentMin = date.getMinutes();
    let currentSec = date.getSeconds();
    let unitAngle = 360 / 60;
    let uniteHourAngle = 360 / 12; 
    let secAngle = 180 + unitAngle * currentSec;
    let minAngle = unitAngle * currentMin + currentSec / 60 * unitAngle;
    let hourAngle = 270 + uniteHourAngle * (currentHour - 12) + currentMin / 60 * unitAngle;
    document.getElementById("sec").style.transform = `rotate(${secAngle}deg)`;
    document.getElementById("min").style.transform = `rotate(${minAngle}deg)`;
    document.getElementById("hour").style.transform = `rotate(${hourAngle}deg)`;
}

setInterval(setTime, 1000);

