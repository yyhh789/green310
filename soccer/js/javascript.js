$(document).ready(function(){

$(window).scroll(function(){
    let sc = $(this).scrollTop()
    $('h1').text(sc);

    $('section article').eq(0).css({'transform':'translateZ('+(0+sc)+'px)'})
    $('section article').eq(1).css({'transform':'translateZ('+(-5000+sc)+'px)'})
    $('section article').eq(2).css({'transform':'translateZ('+(-10000+sc)+'px)'})
    $('section article').eq(3).css({'transform':'translateZ('+(-15000+sc)+'px)'})
    $('section article').eq(4).css({'transform':'translateZ('+(-20000+sc)+'px)'})


});


// nav li를 클릭했을떄 , 각 순번을 찾고 scroll의 위치값을 일정 거리만큼씩 움직이게 해라.
$('nav li').click(function(){
    let i = $(this).index();
    console.log(i)

$('html,body').stop().animate({scrollTop:5000*i},1400)

})




})