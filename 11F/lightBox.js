let closeBtn = document.querySelector('.close');
let mask = document.querySelector('.mask');
let floatGroup = document.querySelector('.floatGroup');
let imageBox = document.querySelectorAll('.imageBox');
// 點選圖片
for(var i = 0; i< imageBox.length ; i++){
    imageBox[i].onclick = function (e){
        showSlides(e.target.dataset.num);
        mask.style.display = "block";
        floatGroup.style.display = "flex";
    };
}
// 關閉畫面
closeBtn.onclick = function (){
    mask.style.display = "none";
    floatGroup.style.display = "none";
};
// 控制輪放
let slideIndex = 1;
function showSlides(n) {
    let slides = document.getElementsByClassName("showImage");
    let imagePage = document.getElementById("page");
    slideIndex = n;
    if (n > slides.length) { slideIndex = 1};
    if (n < 1) { slideIndex = slides.length };
    imagePage.innerHTML = slideIndex + "<small>/6</small>";
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex- 1].style.display = "flex";
}
function plusSlides(n) {
    let num1 = parseInt(slideIndex);
    let num2 = parseInt(n)
    showSlides(num1+= num2);
}
function currentSlide(n) {
    showSlides(parseInt(slideIndex = n));
}