let page1 = document.getElementById("page1");
let page2 = document.getElementById("page2");
let page3 = document.getElementById("page3");

let timer = document.getElementById("timer");
let frontNumber = document.getElementById("frontNumber");
let backNumber = document.getElementById("backNumber");
let answerInput = document.getElementById("answer");
let operationText = document.getElementById("operation");
let ScoreText = document.getElementById("score");
let finalScoreText = document.getElementById("finalScore");
let historyScoreText = document.getElementById("historyScore");

let inputing = true; //判斷是否要更換題目
let _Timer,finalAnswer,Score=0;

let startBtn = document.querySelector('.bottomText > button');
startBtn.onclick = function(){
  page1.style.display = "none";
  page2.style.display = "flex";
  Score = 0;
  ScoreText.innerHTML = serialNum("000",Score);
  inputing = true;
  startGame();
};

let finalBtn =  document.querySelector('.page3 > button');
finalBtn.onclick = function(){
  page1.style.display = "flex";
  page3.style.display = "none";
  clearTimeout(_Timer);
};

// 計時開始
function startGame(){
  for(let i = 0; i<=60 ; i++){
    _Timer = window.setTimeout(function() {
      timer.innerHTML = "00:"+ serialNum("00",i);
      if(i == 60){
        page2.style.display = "none";
        page3.style.display = "flex";
        finalScoreText.innerHTML = Score;
        if(localStorage.getItem("higestscore")){
          if(localStorage.getItem("higestscore")<Score){
            localStorage.setItem("higestscore",Score);
          }
        }else{
            localStorage.setItem("higestscore",Score);
        }
        historyScoreText.innerHTML = "最高紀錄："+ localStorage.getItem("higestscore");
      }else{
        outputTopic(i)
      }
    }, 1000 * i);
  }
}
// 組裝題目
function outputTopic(time){
  if(inputing){
    let front,back,operation;
    front = numberText(time);
    back = numberText(time);
    operation = judgeOperation();
    finalAnswer = operationAns(front,back,operation);
    if(String(finalAnswer).indexOf('.') > -1) {
      // 如果有餘數會重新跑一次數字
      inputing = true;
      outputTopic(time);
    }else{
      frontNumber.innerHTML = front;
      backNumber.innerHTML  =  back;
      operationText.innerHTML = operation;
      inputing = false;
    }
  }
  consoleTitle(time)
}
// 判斷使用者輸入答案
function consoleTitle(time){
  answerInput.oninput = function(e){
    // 偵測輸入數字
    let userans = e.target.value;
    // 監聽是否有按下Enter
    document.onkeydown = function(e){
      if(e.keyCode == 13){
        judgeAns(userans,finalAnswer,time);
        inputing = true;
        answerInput.value = "";
        outputTopic(time);
      }
    }
  }
}
// 出題位數
function numberText(num){
  let number;
  if(0<=num && num <=20){
    number = randomusefloor(1,9);
    return number;
  }else if(21<=num && num <=40){
    number = randomusefloor(10,99);
    return number;
  }else if(41<=num  && num <=59){
    number = randomusefloor(100,999);
    return number;
  }
}
// 計算答案
function operationAns(front,back,operation){
  let finalAns ;
  switch(operation){
      case'+':
        finalAns = Number(front) + Number(back) ;
        break;
      case'-':
        finalAns = Number(front) - Number(back) ;
        break;
      case'×':
        finalAns = Number(front) * Number(back) ;
        break;
      case'÷':
        if(Number(front) % Number(back)!=0){
          // 取到小數點第一位
          let ans = Number(front) / Number(back)
          finalAns = ans.toFixed(1);
        }else{
          finalAns = Number(front) / Number(back)
        }
        break;
  }
  //console.log(finalAns)
  return finalAns;
}
// 判斷使用者輸入跟答案是否相符合
function judgeAns(userans,finalAnswer,time){
  if(Number(userans) == Number(finalAnswer)){
    if(time <=40){
      Score = Score+1;
    }else if(41<=time){
      Score = Score+5;
    }
  }else{
    if(41<=time){
       if(Score == 0){
         Score = 0;
       }else{
        Score = Score-1;
       }
    }
  }
  ScoreText.innerHTML = serialNum("000",Score);
}
// 隨機產生運算符號
function judgeOperation(){
  let operationArray = ["+","-","×","÷"];
  return operationArray[randomusefloor(0,3)]; 
};
// 設定兩位數字
function serialNum(type,num) {
	let member = type;
	let Num = String(num).length;
	let Data;
	if (num <= type.length) {
		Data = member.slice(0, -1).concat(num);
	} else {
		Data = member.substr(Num, num).concat(num);
	}
	return Data;
}
// 亂碼產生
function randomusefloor(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

// 偵測有沒有修改歷史紀錄
historyScore();
function historyScore(){
  window.addEventListener('storage',()=>{
    if(this.higest !== localStorage.getItem("higestscore")){
      alert("偵測到分數被修改，遊戲積分歸0");
      localStorage.setItem("higestscore",0);
      history.go(0);
    }
  });
}