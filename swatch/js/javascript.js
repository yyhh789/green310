$(document).ready(function(){
    
    let ht = $(window).height();
    
    $('section').height(ht);

    $(window).resize(function(){
        let ht = $(window).height();
    
        $('section').height(ht);
    });
    // nav에 li를 눌를떄 마다  scrollTop의 위치를 바꾸어라
    $(window).scroll(function(){
    
    let sc = $(window).scrollTop()
    
    $('h1').text(sc)  
            
    // if(sc>ht*0 && sc<ht*1){
    //         $('nav li').removeClass('on')
    //         $('nav li').eq(0).addClass('on')
    //     }
    //     if(sc>=ht*1 && sc<ht*2){
    //         $('nav li').removeClass('on')
    //         $('nav li').eq(1).addClass('on')
    //     }
    //     if(sc>=ht*2 && sc<ht*3){
    //         $('nav li').removeClass('on')
    //         $('nav li').eq(2).addClass('on')
    //     }
    //     if(sc>=ht*3 && sc<ht*4){
    //         $('nav li').removeClass('on')
    //         $('nav li').eq(3).addClass('on')
    //     }

    // 반복문을 사용한 축약 설정
        for(var a=0; a<4; a++){
            if(sc>=ht*a && sc<ht*a+1){
                $('nav li').removeClass('on')
                $('nav li').eq(a).addClass('on')
            }
        }
    });
    
    $('nav li').click(function(e){
        // a가 들어갔을경우 써줘야함
        e.preventDefault(); 
        
        let i = $(this).index();
        console.log(i);
        let ht = $(window).height();
        $('html,body').stop().animate({scrollTop:ht*i},1400,'easeOutBounce')
        $('nav li').removeClass('on')
        $(this).addClass('on')

    });

// section 위에서 마우스를 올릴떄,내릴떄 이벤트가 발생한다.
    $('section').mousewheel(function(event,delta){
        if(delta>0){
            // 나의 이전요소의 높이값
            let prev = $(this).prev().offset().top 



            $('html,body').stop().animate({scrollTop:prev},1400,'easeOutBounce')
        }
        else if (delta<0){
            let next = $(this).next().offset().top 



            $('html,body').stop().animate({scrollTop:next},1400,'easeOutBounce')
        }
    })

// 예제 윈도우에서 마우스를 올렷을떄, 마우스올림 글씨 출력
// 윈도우에서 마우스를 내릴떄, 마우스내림 글씨 출력
// $(window).mousewheel(function(event,delta){
//     event.preventDefault();

//     // 마우스를 올렸을떄
//     if(delta>0){
//         $('h1').text('마우스올림')
//     }
//     else if (delta<0){
//         $('h1').text('마우스내림')
//     }
// })



// 확인용
//     .p11 {bottom: 20px;
//     right: 20px;}
//     .p12 {bottom: -40px;
//     right: 130px;}
//     .p13 {top: 180px;
//     right: 60px;}
$('section').mousemove(function(e){
    let x = e.pageX;
    let y = e.pageY;
    console.log(x,y)
    $(this).find('.p11').css({'bottom': 20+(y/10),'right': 20+(x/10)})
    $(this).find('.p12').css({'bottom': 20-(y/10),'right': 20-(x/10)})
    $(this).find('.p13').css({'bottom': 20+(y/10),'right': 20+(x/10)})
    $(this).find('.p21').css({'bottom': 20+(y/10),'right': 20+(x/10)})
    $(this).find('.p22').css({'bottom': 20-(y/10),'right': 20-(x/10)})
    $(this).find('.p31').css({'bottom': 20+(y/10),'right': 20+(x/10)})
    $(this).find('.p32').css({'bottom': 20-(y/10),'right': 20-(x/10)})
    $(this).find('.p33').css({'bottom': 20+(y/10),'right': 20+(x/10)})
    $(this).find('.p41').css({'bottom': 20+(y/10),'right': 20+(x/10)})
    $(this).find('.p42').css({'bottom': 20-(y/10),'right': 20-(x/10)})
})


}) //제이쿼리 끝