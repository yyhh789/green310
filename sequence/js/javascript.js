$(document).ready(function(){
let imgs = '';


    for(var i =0; i<200; i++){
    imgs+='<img src="img/pic'+i+'.jpg" alt="">'}
    
        $('section').html(imgs);


        // 마우스를 움직일떄 마다 한장씩 사진이 보여라

$('section').mousemove(function(e){
let x = e.pageX;
let wd = $(window).width();

// 백분율
// 사진이 200개라서 100을 200으로 수정
let percent = Math.floor((x/wd)*200)



$('h1').text(percent);
$('section>img').hide();
$('section>img').eq(percent).show();

})


})