//關閉原本瀏覽器的兩指縮放、拖拉捲動操作的干擾
document.body.addEventListener('touchmove',function(e){e.preventDefault(); },false);   

let topGroup = document.querySelector('.top');
let bottomGroup = document.querySelector('.bottom');

/* 這邊是按鈕 */
let hiddenTopBtn = document.querySelector('.hiddenTop');
let bottomBtn = document.querySelector('.hiddenBottom');
let closePaintBtn = document.querySelector('.closePaintBtn');

/*----- 關於按鍵控制 -----*/
let consoleTopBtn = true ;
hiddenTopBtn.onclick = function(){
  if(consoleTopBtn){
    consoleTopBtn = false ;
    topGroup.setAttribute('class','top hidden');
    topGroup.style.top = "-90px";
    document.querySelector('.hiddenTop > svg').style.transform = "rotate(180deg)";
  }else{
     consoleTopBtn = true ;
    topGroup.setAttribute('class','top show');
    topGroup.style.top = "0px";
    document.querySelector('.hiddenTop > svg').style.transform = "rotate(0deg)";
  }
};
let consolebottomBtn = true ;
bottomBtn.onclick = function(){
  if(consolebottomBtn){
    consolebottomBtn = false ;
    bottomGroup.style.display = "none";
    closePaintBtn.style.display = "block";
  }
};
closePaintBtn.onclick = function(){
  if(!consolebottomBtn){
    consolebottomBtn = true ;
    bottomGroup.style.display = "flex";
    closePaintBtn.style.display = "none";
  }
}


/*----- 開始畫畫搂 -----*/
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let drawing = false;

let X1 = undefined;
let Y1 = undefined;
let X2 = undefined;
let Y2 = undefined;

// 計算筆畫
let step = -1 //計算步驟let 
let brushStep = ""; // 暫存畫筆的步數
const canvasArray = new Array(); //用來存放當前狀態的陣列
let undo = document.getElementById("undo");
let redo = document.getElementById("redo");


//隨著螢幕大小更動畫布大小
canvas.width = (document.body.clientWidth);
canvas.height = (window.innerHeight);	

// 筆畫尺寸
let size = document.getElementById('pensize');
size.onchange = function(){
    ctx.lineWidth = size.value;
}
// 畫板清空
clear.onclick = function(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  redo.setAttribute('class','tools disabled');
  undo.setAttribute('class','tools disabled');
}
// 筆畫顏色
let color = document.querySelector('.ColorGroup');
let colorArray = {
  'white':'#ffffff',
  'orange':'#FFAF6A',
  'red':'#FF5757',
  'purple':'#AD1774',
  'black':'#000000'
};
color.onclick = function(e){
  if(e.target.className.includes('color')){
    let _color = e.target.className.split('-')[1];
    ctx.strokeStyle = colorArray[_color];
  }else{
    return;
  }
}
// 存取圖片
save.onclick = function(){
  let url = canvas.toDataURL("image/png");
  let a=document.createElement('a');
  document.body.appendChild(a);
  a.href=url;
  a.download='我的作品';
  a.target='_blank';
  a.click() ;
}
// 上傳檔案
file.addEventListener('change',(e)=>{
  let file = e.target.files[0];
  console.log(file)
  let img = document.createElement('img');
  img.src = window.URL.createObjectURL(file);
  img.style.width = document.body.clientWidth;
  img.style.height = window.innerHeight;
  img.onload = () =>{
    console.log(1)
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    push();
  };
});


canvas.onmousedown=function(e){
  drawing = true ;
  X1 = e.offsetX;
  Y1 = e.offsetY;
  ctx.lineCap ='round'; 
  ctx.lineJoin ='round'; 
  ctx.lineWidth =size.value;
}
canvas.onmousemove=function(e){
  if(!drawing){
    return;
  }
  // 取得終點座標
  X2 = e.offsetX;
  Y2 = e.offsetY;

  // 開始繪圖
  ctx.beginPath();
  ctx.moveTo(X1, Y1);
  ctx.lineTo(X2, Y2);
  ctx.stroke();

  // 更新起始點座標
  X1 =  X2;
  Y1 =  Y2;
}
canvas.onmouseup=function(e){
  ctx.closePath();
  drawing = false;
}
canvas.onmouseup=function(e){
  ctx.closePath();
  drawing = false;
  push();
}
// 計算步驟
function push(){
    step ++;
    if(step < canvasArray.length) {
        canvasArray.length = step
    }
    canvasArray.push(canvas.toDataURL())
    brushStep = step;
    
    if(step > -1 && canvasArray.length >0){
      undo.setAttribute('class','tools');
    }
    if(step>-1 && canvasArray.length-1 == step){
      redo.setAttribute('class','tools disabled');
    }
};
// 上一步
undo.onclick = function(){
    if(step >0){
        step--;
        brushStep = step;
        const img = new Image() ;//建立新的 Image
		img.src = canvasArray[step]; //載入影像
        img.setAttribute("crossOrigin",'anonymous');
        ctx.clearRect(0,0,canvas.width,canvas.height);
		img.onload = function(){
            ctx.drawImage(img, 0,0)
        };
      redo.setAttribute('class','tools');
        drawing = false;
    }
    
    if(step == 0 ){
      undo.setAttribute('class','tools disabled');
    }else if(step == 0 && canvasArray.length >0){
      undo.setAttribute('class','tools');
      
    }
    
}
// 下一步
redo.onclick = function() {
    if(step < canvasArray.length - 1){
        step++;
        const img = new Image(); 
		img.src = canvasArray[step]; 
        img.setAttribute("crossOrigin",'anonymous');
		ctx.clearRect(0,0,canvas.width,canvas.height);
		img.onload = function(){
            ctx.drawImage(img, 0,0)
        };
        drawing = false;
    }
  
    if(canvasArray.length > 0 && step < canvasArray.length){
      redo.setAttribute('class','tools');
    }
    if(canvasArray.length > 0 && step == canvasArray.length-1){
      redo.setAttribute('class','tools disabled');
      undo.setAttribute('class','tools');
    }
}



