$(document).ready(function(){

    $(window).scroll(function(){
        let sc = $(this).scrollTop();

        let sNum = Math.floor(sc);

        let bht = $('.box1').height()

        let lsc = (sNum-bht)/10;

        $('h1').text((sNum-bht)/10);

        // + 를 주면 오른쪽으로감
        if(sc>=bht){
            $('.box2').addClass('fix')
            $('.box2 p').css({left:200-lsc})
        }
        else{
            $('.box2').removeClass('fix')
        }

    })

})