$(document).ready(function(){
// 자동으로 1초에 한번씩 시간이 바뀌어라.
setInterval(function(){
        // 현재시간을 가져오는 내장객채 사용하기
        let now = new Date(),
        hr  = now.getHours(),
        min = now.getMinutes(),
        set = now.getSeconds();
        $('p span').eq(0).text(hr);
        $('p span').eq(1).text(min);
        $('p span').eq(2).text(set);
},1000);

// nav의 li를 클릭했을때 마다 class값이 바뀌어라
$('nav li').eq(0).click(function(){
    $('wrap').removeClass()
    $('#wrap').addClass('morning')
})

$('nav li').eq(1).click(function(){
    $('wrap').removeClass()
    $('#wrap').addClass('afternoon')
})

$('nav li').eq(2).click(function(){
    $('wrap').removeClass()
    $('#wrap').addClass('evening')
})

$('nav li').eq(3).click(function(){
    $('wrap').removeClass()
    $('#wrap').addClass('night')
})

})