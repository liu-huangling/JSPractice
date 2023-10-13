const app = new Vue({
    el:".box",
    data(){
      return{
        countryArray:[
          {
            location:'NEW YORK',
            timeZone:'America/New_York'
          },
          {
            location:'LONDON',
            timeZone:'Europe/London'
          },
          {
            location:'BANGKOK',
            timeZone:'Asia/Bangkok'
          },
          {
            location:'TAIWAN',
            timeZone:'Asia/Taipei'
          },
          {
            location:'SYDNEY',
            timeZone:'Australia/Sydney'
          },
        ],
      }
    },
    //新增物件
    methods:{
      getTime(){
        this.countryArray.forEach(item=>{
          let time = new Date().toLocaleString("en-US",{timeZone:item.timeZone}); // 各區時間
          let timeZone = new Date(time);
          
          let year = timeZone.getFullYear();
          // 取英文簡稱的月份名稱
          let monthName = new Date().toLocaleString("en-US",{timeZone:'Asia/Taipei',month:'short'}); 
          let day = timeZone.getDate()< 10 ? '0' + timeZone.getDate() : timeZone.getDate();
          // 小於兩位數前面會補0
          let hours = timeZone.getHours() < 10 ? '0' + timeZone.getHours() : timeZone.getHours();
          let minutes = timeZone.getMinutes() < 10 ? '0' + timeZone.getMinutes() : timeZone.getMinutes();
          
          let timeArray = {
            'year':year,
            'month':monthName,
            'day':day,
            'hours':hours,
            'min':minutes
          };
          // $set(要更改的值,要更改的名稱/要新增的名稱,新值)
          this.$set(item,'time',timeArray); 
        });
      }
    },
    created(){
      setInterval(() => {
        this.getTime();
      }, 1000); 
    }
  });