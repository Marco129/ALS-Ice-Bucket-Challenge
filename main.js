$(document).ready(function(){
    var picked = false;
    $('#container_bucket').on('click', function(){
        $(this).unbind('click');
        picked = true;
        $('body, #container_bucket').css('cursor', 'none');
        $(document).mousemove(function(e){
            if(e.pageX <= 0 || e.pageX+90 >= $(window).width() || e.pageY+60 >= $(window).height()) return false;
            $('#container_bucket').find('svg').offset({ top: e.pageY-50, left: e.pageX });
        });
    });
    $('#container_man').on('click', function(e){
        e.preventDefault();
        if(!picked) return false;
        $(this).unbind('click');
        $(document).unbind('mousemove');
        $('#container_bucket').find('svg').attr('class', 'center bucket');
        window.setTimeout(function(){
            var water = document.getElementById('water');
            water.play();
            $('#container_bucket').find('svg').find('circle').remove();
            $('#container_bucket').find('svg').find('rect:eq(0)').attr('fill', '#F6F6F6');
            $('#container_bucket').find('svg').find('rect:eq(1)').attr('height', 0);
            $('#container_waterdrop').offset({ top: e.pageY }).css('visibility', 'visible').animate({
                top: '+=' + (405-e.pageY)
            }, 500, function(){
                $('#container_man').find('svg').attr('class', 'center man freezing');
                $('#container_bucket').fadeOut('fast', function(){
                    $('#info').fadeIn();
                    $('body').css({'cursor': 'auto', 'overflow': 'auto'});
                });
            });
        }, 100);
    });
});