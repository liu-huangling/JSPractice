let wheelData;
let api = "Lottery.json";
axios({
  method: 'GET',
  'Content-Type': 'application/json;charset=utf-8',
  url: api
}).then((res) => {
  wheelData = res.data;
  runEach();
}).catch((err) => {
  console.log(err)
})

let box = document.querySelector(".box");
let centerButton = document.querySelector(".centerText");
let arrow = document.querySelector(".arrow");
let banner = document.querySelector(".bgBanner");
let status = false ; 
let allAmount =0;
// 建立圓弧扇形

function runEach(){
  wheelData.forEach((item,i)=>{
    let sector = document.createElement('div');
    sector.className = "sector sector-"+ parseInt(i+1);
    sector.dataset.amount = item.amount;
    let textGroup = document.createElement('div');
    textGroup.className = "textGroup";
    let p = document.createElement('p');
    p.className = "material-symbols-outlined";
    p.innerText = item.icon;
    let span = document.createElement('span');
    span.innerText = item.text;
    textGroup.appendChild(p);
    textGroup.appendChild(span);
    sector.appendChild(textGroup);
    box.appendChild(sector);
    allAmount = allAmount + item.amount;
  });
  
  centerButton.onclick = function(e){
    if(status){
      return;
    }
    i++;
    status = true;
    let sector = document.querySelectorAll(".box .sector");
    for(var z = 0 ; z <sector.length;z++ ){
      sector[z].classList.remove("chooseSector");
    }
    banner.style.display = "none";
    rotateFunction();
  };
}
var i = 0;
function rotateFunction(){
  let random = Math.floor(Math.random()*6)+1;
  console.log(random)
  let nowDiv,preRotate,rotate ;
  random == document.querySelectorAll('.sector').length ?nowDiv = document.querySelector(".sector-1"):nowDiv = document.querySelector(".sector-"+parseInt(random+1));
  if(nowDiv.dataset.amount == 0){
    rotateFunction();
    return;
  }
  allAmount --;
  if(allAmount == 0){
    Swal.fire("獎品已全數抽取完畢!");
    localStorage.removeItem('history');
    return;
  }
  nowDiv.dataset.amount = nowDiv.dataset.amount -1;
  arrow.classList.add("aniRotate");
  arrow.style.transform == ""? preRotate = 0:preRotate = parseInt(arrow.style.transform.split('(')[1].split('d')[0]-1800);
  rotate= random * 60  ;
  console.log(document.styleSheets)
  document.styleSheets[2].insertRule(`
      @keyframes rotate{
        from{
            transform: rotate(`+preRotate +`deg);
        }
        to{
            transform: rotate(`+parseInt(rotate + 1800) +`deg);
        }
      }`,26+i);
  arrow.style.transform =  'rotate('+ parseInt(rotate)+'deg)';
  
  window.setTimeout((() => {
    nowDiv.classList.add("chooseSector");
    let history,text ;
    text = nowDiv.getElementsByTagName('span')[0].innerHTML + "* 1 </br>";
    document.querySelector('.rightFixDiv h2').innerHTML = nowDiv.getElementsByTagName('span')[0].innerHTML + "!";
    if(localStorage.getItem('history')!=null){
      history =localStorage.getItem('history');
      history = history + text
      localStorage.setItem('history',history);
    }else{
      localStorage.setItem('history',text);
    }
    document.querySelector(".sessionText p").innerHTML =localStorage.getItem('history');
    status = false;
    banner.style.display = "flex";
    arrow.classList.remove("aniRotate");
    document.styleSheets[1].deleteRule;
  }), 3000);
}
if(localStorage.getItem('history')!=null){
  document.querySelector(".sessionText p").innerHTML =localStorage.getItem('history');
}