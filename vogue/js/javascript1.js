$(document).ready(function(){
    $('.box1 em').click(function(){
        $('.box1 em').addClass('on');
        $('.box2').addClass('on');
        // 본인스스로는 서서히 사라져라
        $(this).fadeout(600);
    })
})