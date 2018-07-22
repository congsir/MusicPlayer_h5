(function($, root){
    $scope = $(document.body);
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var reqA;
    var playedTime = 0;

    function dealTime(duration){
        var minute = parseInt(duration / 60);
        var second = duration % 60;

        if(minute < 10){
            minute  = '0' + minute;
        }
        if(second < 10){
            second = '0' + second;
        }

        var time = minute + ':' + second;
        return time;
    }

    function renderEndTime(duration){
        var time = dealTime(duration);
        $scope.find('.endTime').html(time);
    }

    // function startTime(){
    //     var time = new Date().getTime();
    //     var playingTime = 0;
    //     requestAnimationFrame(function(){
    //          var duration = parseInt((new Date().getTime() - time) / 1000);
    //          var currentTime = dealTime(duration);
    //         $scope.find('.currentTime').html(currentTime);
    //     })
    // }

    function renderProcessorDot(totalTime){
         timeStamp = new Date().getTime();
        // audio.curPlayingTime = 0;
        totalTime = totalTime * 1000;
        // var processorLen = $scope.find('.pro-top').width();
        var step = function(){
            var radio = 1 - ((new Date().getTime() - timeStamp) / totalTime + playedTime);
            // console.log(radio);
            radio = (radio * 100).toFixed(4) + '%';
            var temp = `translateX(-${radio})`;
            console.log(temp);
            $scope.find('.pro-top').css('transform' , temp); 
            if(radio != 0){
               reqA = requestAnimationFrame(step);
            }else{
                cancelAnimationFrame(reqA);
            }
        }
       reqA = requestAnimationFrame(step);
    }

    function cancelReq(){
        var arr = $('.pro-top').css('transform').split('')
        var first = arr.indexOf('-');
        var end = arr.indexOf('%');
        playedTime = 1 - parseFloat(arr.splice(first + 1,end).join('')) / 100;
        console.log(playedTime);
        cancelAnimationFrame(reqA);
    }

    function timeInit(){
        playedTime = 0;
        $scope.find('.pro-top').css('transform' , 'translateX(-100%)');
        console.log('666'); 
    }



    root.processor = {
        renderEndTime : renderEndTime,
        renderProcessorDot : renderProcessorDot,
        cancelReq : cancelReq,
        timeInit : timeInit
    }
})(window.Zepto, window.player || (window.player = {}))