var windowWidth = $(window).width();
var viewMode = (windowWidth>768) ? 'desktop':'mobile';
console.log("viewMode = "+viewMode);

$(document).ready(function() {
    if(viewMode == "desktop") {
        $('.gnb-list-item.expanded').hover(
            function() {
                console.log("HOVER");
                var $lnbList = $(this).find('.lnb-list');
                $lnbList.height($lnbList.prop('scrollHeight'));
                $('.lnb-list-bg').css('top', '60px');
            },
            function() {
                console.log("HOVER OUT");
                 $(this).removeClass('open');
                 $(this).find('.lnb-list').height(0);
                  $('.lnb-list-bg').css('top', '0');
            }
        );
    } else {
        $('.gnb-list-item.expanded').click(function(){
            var $lnbList = $(this).find('.lnb-list');
            if($(this).hasClass('open')) {
                console.log("CLICK CLOSE");
                $(this).removeClass('open');
                $lnbList.height(0);
            } else {
                console.log("CLICK OPEN");
                $(this).addClass('open');
                $lnbList.height($lnbList.prop('scrollHeight'));
            }
        });
    }

     $('#mobile-menu').click(function(){
        var $menuIcon = $(this);
        if($menuIcon.hasClass('open')){
            $menuIcon.removeClass('open');
            $('.gnb-inner').css('height', 0);
            $('#wrapper').css({
                'height': 'auto',
                'overflow' : 'auto'
            })
        } else {
            $menuIcon.addClass('open');
            $('.gnb-inner').css('height', 'calc(100% - 60px)');
            $('#wrapper').css({
                'height': '100%',
                'overflow': 'hidden'
            })
        }
     });
});
