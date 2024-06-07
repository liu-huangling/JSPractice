addEventListener("load", (event) => {
    window.addEventListener('keydown', judgeKey ,false);
    itinGame()
});

// game board
const gameStartDom = document.getElementById("game-start");
const gamePlayDom = document.getElementById("game-play");
const gameOverDom = document.getElementById("game-over");

const gameArea = document.getElementById("game-area");
let snake = [{x:8,y:6},{x:7,y:6},{x:7,y:5}]; // 蛇
const foodPosition ={x:0,y:0}; // 食物座標
// 爬行方向
let snakeDirection = {x:1,y:0}; 
let direction = "ArrowRight"; 
let score = 0;
// 設定板子
let rowNum = 16;
let columnNum = 28;
let gameInterval , gameOver ,gameTimer=0;
let changeDirection = true;

let timer =500;

// 判斷鍵盤按鍵
function judgeKey(e){
    if(changeDirection !== true){
        return;
    }
    switch(e.keyCode){
        case 32:
            //  Space
            if(gameStartDom.className.includes("none")){
                return;
            }
            gameStartDom.classList.add('none');
            gamePlayDom.classList.remove('none');
            itinGame();
            break;
        case 40:
            //  ArrowDown
            if(gamePlayDom.className.includes("none")){
                return;
            }
            
            if(direction == "ArrowUp") return;
            snakeDirection = {x:0,y:1};
            direction = "ArrowDown";
            break;
        case 38:
            // ArrowUp
            if(gamePlayDom.className.includes("none")){
                return;
            }
            if(direction == "ArrowDown") return;
            snakeDirection = {x:0,y:-1};
            direction = "ArrowUp";
            break;
        case 39:
            // ArrowRight
            if(gamePlayDom.className.includes("none")){
                return;
            }
            if(direction == "ArrowLeft") return;
            snakeDirection = {x:1,y:0};
            direction = "ArrowRight";
            break;
        case 37:
            // ArrowLeft
            if(gamePlayDom.className.includes("none")){
                return;
            }
            if(direction == "ArrowRight") return;
            snakeDirection = {x:-1,y:0};
            direction = "ArrowLeft";
            break;
        case 89:
            //KeyY
            if(gameOverDom.className.includes("none")){
                return;
            }
            gameOverDom.classList.add('none');
            gamePlayDom.classList.remove('none');
            itinGame();
            break;
        case 78:
            //KeyN
            if(gameOverDom.className.includes("none")){
                return;
            }
            gameOverDom.classList.add('none');
            gameStartDom.classList.remove('none');
            break;
        default:
            // 其他禁用
            //e.returnValue = false;
            break;
    }
    //延遲時間，防止同時按下兩個方向鍵
    changeDirection = false;
    setTimeout(() =>{
        changeDirection = true;
    }, 200);
}


// 遊戲開始
function itinGame(){
    createSnakeMap();
    score = 0;
    speed(500);
    judgeScore();
}

// 建立貪食蛇棋盤 + 蛇 + 食物
function createSnakeMap(){
    gameArea.innerHTML = " ";

    document.querySelector('.now > span').innerHTML = 0;
    for(var i = 0;i < rowNum ; i++){
        let row = document.createElement('div');
        row.classList.add('row');
        for(let j=0;j<columnNum;j++){
            let box = document.createElement('div')
            box.classList.add('box');
            box.dataset.x=j;
            box.dataset.y=i;
            
            row.appendChild(box);
        }
        gameArea.appendChild(row);
    }
    updateGameBoard();
    food(randomNumber(6,parseInt(columnNum)-1),randomNumber(0,parseInt(rowNum)-1));
}

// 隨機出現的食物
function food(randomCol,randomRow){
    let food = document.createElement('div');
    food.classList.add('food');
    let locationBox = document.querySelectorAll('.box');
    locationBox.forEach(box => {
        if(box.dataset.x == randomCol && box.dataset.y == randomRow ){
            // 如果有其他元素，重新計算食物位置
            if(document.querySelector(`.box[data-x="${randomCol}"][data-y="${randomRow}"]`).childNodes.length > 0){
                foodPosition.x = randomNumber(6,parseInt(columnNum)-1);
                foodPosition.y = randomNumber(0,parseInt(rowNum)-1);
                document.querySelector(`.box[data-x="${foodPosition.x}"][data-y="${foodPosition.y}"]`).appendChild(food);
                return;
            }
            foodPosition.x = randomCol;
            foodPosition.y = randomRow;
            box.appendChild(food);
            return;
            
        }
    });
}

// 隨機指定區間亂數
function randomNumber(min,max){
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}

function snakeMove(){
    let foodDom = document.querySelector('.food');
    let newHeadPosition = { x: snake[0].x + snakeDirection.x , y: snake[0].y +snakeDirection.y};
    
    snake.unshift(newHeadPosition);

    if (newHeadPosition.x === foodPosition.x && newHeadPosition.y === foodPosition.y) {
        score++;
        document.querySelector('.now > span').innerHTML = score;
        // 重新建立食物
        foodDom.remove();
        food(randomNumber(6, parseInt(columnNum) - 1), randomNumber(0, parseInt(rowNum) - 1));
        
        judgeGameScore(score);
    } else {
        // 咩有吃到
        snake.pop();
    }
    if(checkGameOver()){
        judgeScore();
        gameOverPage(score,localStorage.getItem('history'));
    }
}

function updateGameBoard(){
    document.querySelectorAll(".snake").forEach(e=>{e.remove();})
    let opacity = 1;
    for(var n = 0; n < snake.length ;n++){
        let snakeBody = document.createElement('div');
        opacity -= opacity/snake.length;
        if(opacity <=0){ opacity=.2; };
        snakeBody.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        snakeBody.classList.add('snake');
        if(n==0){
            snakeBody.classList.add('head');
        }
        // 設定可以穿越牆壁
        if(snake[n].x >= 28){
            snake[n].x = 0;
        }
        if(snake[n].x < 0){
            snake[n].x = 27;
        }
        if(snake[n].y >= 16){
            snake[n].y = 0;
        }
        if(snake[n].y < 0){
            snake[n].y = 15;
        }
        gameArea.querySelector(`.box[data-x="${snake[n].x}"][data-y="${snake[n].y}"]`).appendChild(snakeBody);
    }
}
// 遊戲結束
function checkGameOver(){
    // 碰到身體鼠掉
    for(var i=1;i<snake.length;i++){
        if((snake[0].x === snake[i].x)&&(snake[0].y === snake[i].y)){
            console.log("die")
            return true;
        }
    }
}  
// 歷史成績
function judgeScore(){
    if(localStorage.getItem('history')!=null){
        if(score > localStorage.getItem('history')){
            localStorage.setItem('history',score);
        }
    }else{
        localStorage.setItem('history',score);
    }
    document.querySelector(".score-collection.history > span").innerHTML = localStorage.getItem('history');
}

function speed(timer){
    gameInterval = setInterval(() => {
        snakeMove();
        updateGameBoard();
    }, timer);
}

function judgeGameScore(score){
    if(score % 5 === 0){
        console.log(timer);
        clearInterval(gameInterval);
        timer -= 50;
        if(timer<=150){
            timer = 150;
        }
        speed(timer);
    }
}

function gameOverPage(score,history){
    gamePlayDom.classList.add('none');
    gameOverDom.classList.remove('none');
    document.getElementById("overScore").innerHTML = score;
    document.getElementById("bestScore").innerHTML = history;
    snake.length = 0;
    score = 0;
    snake = [{x:8,y:6},{x:7,y:6},{x:7,y:5}]; 
    direction = "ArrowRight"; 
    snakeDirection = {x:1,y:0};
    timer = 500;
    clearInterval(gameInterval);
}

