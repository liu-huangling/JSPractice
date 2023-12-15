let GameStartBox = document.querySelector('.gamepage-start');
let GameBox = document.querySelector('.gamepage-game');
let PuzzleGroup = document.querySelector('.puzzleGroup');
let PuzzleBox = document.querySelector('.gamepage-game > .box');
let GameOverBox = document.querySelector('.gamepage-gameover');
let GameStartBtn = document.getElementById('GameStart');
let ReLoadBtn = document.getElementById('ReLoad');
let AgainBtn = document.getElementById('Again');

GameStartBtn.onclick = function (){
    GameStartBox.classList.add('hidden');
    setTimeout(function(){
        GameStartBox.style.display = "none";
        GameBox.classList.add('show');
        GameBox.style.display = "block";
        GameStart();
    },1000);
}

function GameStart(){
    let puzzleName = 'Puzzle-';
    for(var i = 1; i<=9 ; i++){
        let PuzzleDiv = document.createElement('div');
        PuzzleDiv.className = "puzzleBox";
        PuzzleDiv.dataset.num = i;
    
        let Puzzle = document.createElement('img');
        Puzzle.src = 'img/'+puzzleName+ i +'.png';
        Puzzle.className = "puzzle";// puzzle-"+ i;
        Puzzle.alt = puzzleName+ i;
        Puzzle.draggable = true;
        Puzzle.style.zIndex = i+1;
        Puzzle.dataset.checkNum = i;
        
        let PuzzleX , PuzzleY;
    
        PuzzleX = Math.abs(document.documentElement.clientWidth - Math.random() * document.documentElement.clientWidth - Puzzle.width);
        PuzzleY = Math.abs(document.documentElement.clientHeight - Math.random() * document.documentElement.clientHeight - Puzzle.height);
        
        Puzzle.style.left = PuzzleX + "px";
        Puzzle.style.top = PuzzleY + "px";

        
        PuzzleBox.appendChild(Puzzle);
        PuzzleGroup.appendChild(PuzzleDiv);
        
    }
    ReturnDiv();
}

function roadomFunction(min,max){
   return Math.floor(Math.random()*(max-min+1))+min;
}

ReLoadBtn.onclick = function (){
    let Puzzle = document.querySelectorAll('.puzzle');
    let PuzzleBox = document.querySelectorAll('.puzzleBox');
    for(var z = 0; z < PuzzleBox.length ; z++){
        Puzzle[z].remove();
        PuzzleBox[z].remove();
    }
    GameStart();
    roadomPuzzleStyle();
}

function roadomPuzzleStyle(){
    let Puzzle = document.querySelectorAll('.puzzle');
    for(var a = 0 ; a < Puzzle.length ; a++){
        let PuzzleX , PuzzleY;
    
        PuzzleX = Math.abs(document.documentElement.clientWidth - Math.random() * document.documentElement.clientWidth - Puzzle[a].width);
        PuzzleY = Math.abs(document.documentElement.clientHeight - Math.random() * document.documentElement.clientHeight - Puzzle[a].height);
        
        Puzzle[a].style.left = PuzzleX + "px";
        Puzzle[a].style.top = PuzzleY + "px";
    }
}

function ReturnDiv(){
    let puzzle = document.querySelectorAll('.puzzle');
    puzzle.forEach(item =>{
        item.addEventListener('dragstart', dragStart);  
    });

    let puzzleBox = document.querySelectorAll('.puzzleBox');
    puzzleBox.forEach(item =>{
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);  
        item.addEventListener('dragleave', dragLeave);
    });
}

let container=null;
const dragStart = (e) =>{
    let Puzzle = document.querySelectorAll('.puzzle');

    container = e.target;
}
const dragOver = (e) =>{
    e.preventDefault();
    if(e.target.className == "puzzleBox"){
        e.toElement.classList.add('hover');
    }
}
const dragDrop = (e) =>{
    let divNum = e.target.dataset.num;
    let puzzleNum = container.dataset.checkNum;
    if(divNum == puzzleNum){
        container.style.left = 0;
        container.style.top = 0;
        if(divNum != 1|| divNum != 3 || divNum != 4){
            container.classList.add('puzzle-'+divNum);
        }
        e.target.appendChild(container);
        checkAllDom();
    }
    e.toElement.classList.remove('hover');
    
}

const dragLeave = (e) =>{
    e.toElement.classList.remove('hover');
}

function checkAllDom(){
    let PuzzleBox = document.querySelectorAll('.puzzleBox');
    let checkValue = 0;
    for(var z = 0; z < PuzzleBox.length ; z++){
        if(PuzzleBox[z].hasChildNodes()){
            checkValue++;
        }
    }
    if(checkValue == 9){
        GameBox.classList.add('hidden');
        setTimeout(function(){
            GameBox.style.display = "none";
            GameOverBox.classList.add('show');
            GameOverBox.style.display = "block";
        },1000);
        
    }
}

AgainBtn.onclick = function (){
    history.go(0);
}