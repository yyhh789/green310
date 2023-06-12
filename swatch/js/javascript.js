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
    
    });
    
    $('nav li').click(function(e){
        // a가 들어갔을경우 써줘야함
        e.preventDefault(); 
        
        let i = $(this).index();
        console.log(i);
        let ht = $(window).height();
        $('html,body').stop().animate({scrollTop:ht*i},1400)
    });

// section 위에서 마우스를 올릴떄,내릴떄 이벤트가 발생한다.
    $('section').mousewheel(function(event,delta){
        if(delta>0){
            // 나의 이전요소의 높이값
            let prev = $(this).prev().offset().top 



            $('html,body').stop().animate({scrollTop:prev},1400)
        }
        else if (delta<0){
            let next = $(this).next().offset().top 



            $('html,body').stop().animate({scrollTop:next},1400)
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






}) //제이쿼리 끝