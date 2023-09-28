function run(){
    let Tbox = document.querySelector('.box-container');
    for(var i = 2 ; i <=9 ; i++){
      let box = document.createElement('div');
      box.className = "box box-content";
      let inbox = document.createElement('div');
      inbox.className = "inbox-content";
      var mun = document.createElement("h1");
      mun.innerText = i ;
      
      inbox.appendChild(mun)
      for(var a = 1 ; a <= 9 ; a++){
        var formula_li = document.createElement('li');
        var formula_span = document.createElement('span');
        var ans = i*a;
        formula_span.innerText = i + " × " + a + " = " + ans;
        formula_li.appendChild(formula_span)
        inbox.appendChild(formula_li)
      }
      box.appendChild(inbox)
      Tbox.appendChild(box)
    }
  }
  run();
  