$(document).ready(function(){

    // 메뉴버튼을 클릭했을때,nav와 section이 바뀌어라.
    
    $('#wrap em').click(function(){
    
        $('#wrap nav').addClass('on');
        $('#wrap section').addClass('on');
    
        // 본인스스로는 서서히 사라져라.
        $(this).fadeOut(600)
    
    
    })
    // gnb의 li를 클릭했을때,본인의 순번을 찾고 
    // section의 div순번에 맞추어 on 값을 주어라.
    
    
    $('.gnb li').click(function(){
    
        let i = $(this).index()
        console.log(i);
        $('section div').removeClass('on')
        $('section div').eq(i).addClass('on')
        $('#wrap nav').removeClass('on');
        $('#wrap section').removeClass('on');
        $('#wrap em').fadeIn()
    })
    })