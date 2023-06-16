$(document).ready(function(){
    //artcle의 가로값을 구하고
    //artcle의 갯수를 구하고
    //가로값과 갯수를 곱해서 section의 가로밗에 대입해라.

    // 갯수구하기
    let numAc = $('article').size();

    console.log(numAc);

    // 가로값구하기
    let widAc = $('article').width();

    console.log(widAc);

    // 세로값구하기
    let htAc = $('article').height()

    console.log(htAc);

    let winht = $(window).height()
    
    console.log(winht);

    let secTop = (winht/2)-(htAc/2);

    console.log(secTop)

    //섹션가로값 설정하기
    $('section').width(600+(widAc+20)*numAc)
    $('body').height((widAc+20)*numAc)
    $('section').css({'top': secTop})
    $('nav').css ({'top': secTop-50})


    $(window).scroll(function(){
    
    let sc = $(this).scrollTop()
    $('h1').text(sc)
    $('section').css({'left':-sc})

    });


$('article h2').click(function(){  
    $('article').stop().animate({width:180},500)
    $(this).parent('article').stop().animate({width:600},800)
})







})