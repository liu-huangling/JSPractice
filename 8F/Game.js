let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");

let page1 = document.querySelector(".page1");
let page2 = document.querySelector(".page2");

startBtn.onclick = function(){
  page1.style.display = "none";
  page2.style.display = "flex";
  gameStart();
  recordScore();
};

let playGroup = document.getElementsByClassName("playDiv");
let playGroupDiv = document.querySelector(".playGroup");
let winner = document.querySelector(".winner");
let loser = document.querySelector(".loser");
let deuce = document.querySelector(".deuce");
let tipsCross = document.querySelector(".crossScore > .tips");
let tipsCircle = document.querySelector(".circleScore > .tips");

// 遊戲開始
function gameStart(){
  let circleStatus = true;
  tipsCircle.style.display = "block";
  for(var i = 0; i < playGroup.length;i++){
     playGroup[i].onclick = function(e){
       if(e.target.className.includes("playDiv") && e.target.children.length == 0){
         if(circleStatus){
           let circleDom = document.createElement('div');
           circleDom.className = "circleDom";
           e.target.appendChild(circleDom);
           e.target.dataset.status = 0;
           circleStatus = false;
           tipsCross.style.display = "block";
           tipsCircle.style.display = "none";
         }else {
           let crossDom = document.createElement('div');
           crossDom.className = "crossDom";
           e.target.appendChild(crossDom);
           e.target.dataset.status = 1;
           circleStatus = true;
           tipsCircle.style.display = "block";
           tipsCross.style.display = "none";
         }
       judgeGameStatus();
       }
    }
  }
}
// 判斷遊戲狀態
function judgeGameStatus(){
  let arrayStatus = [] , comparedNum =[];
  for(var i = 0; i < playGroup.length;i++){
    arrayStatus.push(playGroup[i].dataset.status);
  }
  let winArray = ["012","345","678","036","147","258","048","246"]; // 獲勝條件
  winArray.forEach(item=>{
    let winNum = item.split('');
    // 判斷獲勝方
    if(arrayStatus[winNum[0]]==0&&arrayStatus[winNum[1]]==0&&arrayStatus[winNum[2]]==0){
      recordScore('circle');
      playGroupDiv.style.display = "none";
      loser.style.display = "flex";
    }else if(arrayStatus[winNum[0]]==1&&arrayStatus[winNum[1]]==1&&arrayStatus[winNum[2]]==1){
      recordScore('cross');
      playGroupDiv.style.display = "none";
      winner.style.display = "flex";
    }else{
      if(!arrayStatus.includes(undefined)){
        playGroupDiv.style.display = "none";
        deuce.style.display = "flex";
      }
    }
  });
}
// 紀錄成績
function recordScore(name){
  let crossScore = localStorage.getItem('cross');
  let circleScore = localStorage.getItem('circle');
  if(crossScore){
    switch(name){
        case'cross':
          localStorage.setItem('cross',Number(crossScore)+1);
          document.querySelector(".crossScore > p").innerText = Number(crossScore)+1;
          break;
        case'circle':
          localStorage.setItem('circle',Number(circleScore)+1);
          document.querySelector(".circleScore > p").innerText = Number(circleScore)+1;
          break;
    }
  }else{
    localStorage.setItem('cross',0)
    localStorage.setItem('circle',0)
  }
  if(!name){
    document.querySelector(".crossScore > p").innerText = Number(crossScore);
    document.querySelector(".circleScore > p").innerText = Number(circleScore);
  }
}


restartBtn.onclick = function(){
  page1.style.display = "flex";
  page2.style.display = "none";
  tipsCross.style.display = "none";
  deuce.style.display = "none";
  winner.style.display = "none";
  loser.style.display = "none";
  playGroupDiv.style.display = "flex";
  // 清除遊戲元素
  for(var i = 0; i < playGroup.length;i++){
    let child = playGroup[i].childNodes;
    if(child[0]!=undefined)child[0].remove();
    playGroup[i].removeAttribute("data-status");
  }
};