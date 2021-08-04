'use strict';

//button click 시 start timer
const startBtn = document.querySelector('.start__btn');
const timeLb = document.querySelector('.timer__lb');
const countLb = document.querySelector('.count__lb');

const result = document.querySelector('.result');
const animation = document.querySelector('.animation');

const resultText = document.querySelector('.result__textBox');

var aniHeight = (document.documentElement.clientHeight - 90) / 2;
var innerHeights = window.innerHeight - 90;
var aniWidth = document.documentElement.clientWidth - 76;

startBtn.addEventListener('click', (e) => {
    e.target.style.display = "none";

    var time = 10; // 기준시간
    var min = ""; //분
    var sec = ""; // 초

    //count 10으로 초기화
    countLb.textContent = 10;

    //setInterval(함수,시간) :주기적인 실행
    var x = setInterval(function () {
        min = parseInt(time / 60); //몫
        sec = time % 60; // 나머지
        timeLb.textContent = `${min} min ${sec} sec `;
        time--;
        //click 이벤트 발생
        time = clickEvent(time);

        //timeout 시
        if (time < 0) {
            clearInterval(x); //setInterval 종료
            displayThings("You Lost");
        }
    }, 1000);
});

//window resize 될때마다 ani 새로 정의 
window.addEventListener('resize', () => {
    innerHeights = window.innerHeight - 90;

    aniHeight = document.documentElement.clientHeight / 2;
    aniWidth = document.documentElement.clientWidth;
    console.log("H = " + aniHeight + "/ W = " + aniWidth + "/ IH = " + innerHeights);
});

function displayThings(resultsent) {
    timeLb.innerHTML = "Time Over";
    result.style.display = "flex";
    animation.style.display = "none";
    resultText.textContent = resultsent;
}

function randomAni(min, max) {
    //wnidow 너비, 높이를 가져오기
    // 세로랜덤 : 0 ~ aniHeight
    // 가로랜덤 : 0 ~ aniwidth
    /* function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}*/
    return Math.floor(Math.random() * (max - min)) + min;
}

function carrot_draw(name, img) {
    var sources = "";
    for (var i = 1; i < 11; i++) {
        sources += `<img id="${name}_${i}" class="${name}" src ="${img}"/>`;
        // var eachCarrot = document.getElementById(`carrot_${i}`).style.top = randWidth+"px";
        // eachCarrot.top = randWidth+"px";
        // eachCarrot.style.right=  randHeight+"px";
    }
    return sources
}


var randHeight = "";
var randWidth = "";

function carrot_locate(name) {

    for (var i = 1; i < 11; i++) {
        randHeight = randomAni(aniHeight, innerHeight);
        randWidth = randomAni(0, aniWidth);
        var eachCarrot = document.getElementById(`${name}_${i}`);

        console.log(eachCarrot);
        eachCarrot.style.left = randWidth + "px";

        eachCarrot.style.top = randHeight + "px";
    }
}

const imgAni = document.querySelector('.animation');
imgAni.innerHTML = carrot_draw("carrot", "/img/carrot.png");
carrot_locate("carrot");
imgAni.innerHTML += carrot_draw("bug", "/img/bug.png");
carrot_locate("bug");

function clickEvent(timer) {
    imgAni.addEventListener('click', (e) => {
            if (e.target.className === 'bug' && e.target.tagName === 'IMG') {
                timer = -1;
                return timer;
            } else if(e.target.className === 'carrot' && e.target.tagName === 'IMG'){
                //count ==0 일 경우 You Win return
                // clearInterval(x); 
                // displayThings("You Win");
                console.log(e.target.id);
                document.getElementById(e.target.id).style.display = "none";
                
                if(countLb.textContent < 0){
                    
                    displayThings("You Win");
                    return timer;
                }else{
                 
                    //count--
                    countLb.textContent = countLb.textContent-1;
                    return timer;
                }
            }
    });
}