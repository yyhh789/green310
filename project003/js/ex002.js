$(document).ready(function(){
    // 마우스가 움직이는 값을 찾아라

    $(window).mousemove(function(e){

        let x = e.pageX;
        let y = e.pageY;

        $('.cursor').css({'left':'x' ,'top':'y'});

        

    })

// cursor 가 em 안에 들어갔을떄 cursor에 보더색이 바뀌어라


        $('.main p em').mouseenter(function(){
        
        $('.cursor').addClass('style1');



    })

    $('.main p em').mouseleave(function(){
        
        $('.cursor').remveClass('style1');



    })

    $('.main p span').mouseenter(function(){
        
        $('.cursor').addClass('style2');



    })

    $('.main p span').mouseleave(function(){
        
        $('.cursor').remveClass('style2');



    })




})