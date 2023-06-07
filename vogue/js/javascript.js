$(document).ready(function(){
    // 메뉴버튼을 클릭했을때,nav와section이 바뀌어라
    $('#wrap em').click(function(){
        $('#wrap nav').addClass('on');
        $('#wrap section').addClass('on');
        // 본인스스로는 서서히 사라져라
        $(this).fadeOut(600);
    })
    
})