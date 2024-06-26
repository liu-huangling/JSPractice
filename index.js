let textArray =[
    {
        num:"一",
        name:"9x9乘法表",
        url:"/JSPractice/1F/multiplicationTable.html"
    },{
        num:"二",
        name:"時鐘",
        url:"/JSPractice/2F/Clock.html"
    },{
        num:"三",
        name:"計算機",
        url:"/JSPractice/3F/Calculator.html"
    },{
        num:"四",
        name:"時區",
        url:"/JSPractice/4F/TimeZone.html"
    }/*,{
        num:"五",
        name:"全台空氣指標儀板表",
        url:""
    }*/,{
        num:"六",
        name:"60秒算術遊戲",
        url:"/JSPractice/6F/60SecondsChallenge.html"
    },{
        num:"七",
        name:"Canvas畫板",
        url:"/JSPractice/7F/Paint.html"
    },{
        num:"八",
        name:"井字遊戲",
        url:"/JSPractice/8F/Game.html"
    },{
        num:"九",
        name:"抽獎轉盤",
        url:"/JSPractice/9F/Lottery.html"
    },/*{
        num:"十",
        name:"Chrome應用程式(幹話產生器)",
        url:""
    },*/{
        num:"十一",
        name:"燈箱效果",
        url:"/JSPractice/11F/lightBox.html"
    },{
        num:"十二",
        name:"拼圖",
        url:"/JSPractice/12F/Puzzle.html"
    },
    {
        num:"十三",
        name:"貪食蛇",
        url:"/JSPractice/13F/index.html"
    },
];

const app = {
    data(){
        return{
            textArray:[]
        }
    },
    methods: {
        transmitURL(src){
            window.open(src);
        },
        link(){
            window.open("https://medium.com/@LindaLiu0821");
        }
    },
    created() {
        this.textArray = textArray;
    }
  };
  
  Vue.createApp(app).mount("#app");