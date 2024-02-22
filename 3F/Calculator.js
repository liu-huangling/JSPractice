/*
  哈囉~~~
  歡迎參考我的筆記
  https://hackmd.io/@LindaLiu/rklQ8xala
*/

let formulaText = document.getElementById('formula');
let ansText = document.getElementById('answer');

let numberGroup = document.getElementById('numberGroup');
let operationGroup = document.getElementById('operationGroup');
let resultGroup = document.getElementById('resultGroup');

let currentText = 0; // 目前正在輸入的數字
let prevText = 0;    // 上個輸入的數字
let answerText = 0;  // 計算後的答案

let final = false; // 判斷是否按下=


function handleNumberInput(number){
  if(number.length >3) { // 以防萬一點到非數字
    return currentText;
  }
  
  if(formulaText.innerText != 0){ // 判斷有沒有上個輸入的數字
    let regex = /^[0-9\s]*$/;
    if (!regex.test(formulaText.innerText.substr(-1))) {
        prevText = formulaText.innerText.slice(0, -1);
    }
  }
  
  if(currentText == 0){
    switch(number){ //判斷按到哪個數字
      case '00':
        currentText = 0;
        break;
      default:
        currentText = number;
        break;
    }
  }else{
    currentText = currentText + number;
  }
  return currentText;
}

function handleOperationInput(operator){
  if(operator.length >2) { // 以防萬一點到其他東西
    return formulaText.innerText;
  }
  
  if( parseFloat(prevText) == 0 && formulaText.innerText == 0){
    prevText = ansText.innerText;
    //currentText =0;
    switch(operator){
      case '+':
        answerText = parseFloat(prevText) + 0;
        break;
      case '-':
        answerText = parseFloat(prevText) - 0;
        break;
      case '×':
        answerText = parseFloat(prevText) * 1;
        break;
      case '÷':
        if(parseFloat(currentText) == 0){
          reset();
        }else{
          answerText = parseFloat(prevText) / 1;
        }
        break;
    }
  }else{
    if(currentText == 0){
      currentText = formulaText.innerText.slice(0, -1) + operator;
    }else{
      switch(formulaText.innerText.substr(-1)){
        case '+':
          answerText = parseFloat(answerText) + parseFloat(currentText);
          break;
        case '-':
          answerText = parseFloat(answerText) - parseFloat(currentText);
          break;
        case '×':
          answerText = parseFloat(answerText) * parseFloat(currentText);
          break;
        case '÷':
          if(parseFloat(currentText) == 0){
            reset();
          }else{
            answerText = parseFloat(answerText) / parseFloat(currentText);
          }
        break;
      }
    }
    prevText = answerText;
  }
  return answerText + operator;
}

function handleResultClick(resultValue){
  switch(resultValue){
      case 'AC':
        reset();
        break;
      case '⌫':
        if(ansText.innerText != 0){
          currentText =  currentText.slice(0, -1)
          if(currentText == ""){
            ansText.innerText = 0;
            currentText = 0;
          }else{
            ansText.innerText = currentText;
          }
        }else{
          ansText.innerText = 0;
        }
        break;
      case '=':
        switch(formulaText.innerText.substr(-1)){
          case '+':
            answerText = parseFloat(prevText) + parseFloat(currentText);
            break;
          case '-':
            answerText = parseFloat(prevText) - parseFloat(currentText);
            break;
          case '×':
            answerText = parseFloat(prevText) * parseFloat(currentText);
            break;
          case '÷':
            if(parseFloat(currentText) == 0){
             reset();
            }else{
              answerText = parseFloat(prevText) / parseFloat(currentText);
            }
          break;
        }
        if(formulaText.innerText.substr(-1) == 0){
          formulaText.innerText = parseFloat(currentText);
        }else{
          formulaText.innerText = parseFloat(prevText) +formulaText.innerText.substr(-1)+ parseFloat(currentText) ;
        }
        ansText.innerText = answerText;
        final = true;
        break;
  }
}

numberGroup.addEventListener('click',(e)=>{
  finalText();
  let num = handleNumberInput(e.target.innerText);
  ansText.innerText = num;
  
});

operationGroup.addEventListener('click',(e)=>{
  finalText();
  let operator = handleOperationInput(e.target.innerText);
  formulaText.innerText = operator ;
  ansText.innerText = 0;
  currentText = 0;
});

resultGroup.addEventListener('click',(e)=>{
  handleResultClick(e.target.innerText);
});

function finalText(){
   if(final){
     reset();
     final = false;
  }
}

function reset(){
  currentText = 0;
  prevText = 0;
  answerText = 0;
  ansText.innerText = 0;
  formulaText.innerText = 0;
}