var $ = window.Zepto;
var root = window.player;
var dataList;
var $scope = $(document.body)
var indexControl;
var audio = new root.audioManager();
var reqA;   // 记录requestAnimationFrame函数的变量名




//  获取歌曲数据
function getData(url){
    $.ajax({
        type : "GET",
        url : url,
        success : function(data){
            dataList = data;
            indexControl = new root.IndexControl(dataList.length);
            root.render(data[0]);
            audio.setAudioSource(dataList[0].audio);
            root.processor.renderEndTime(dataList[0].duration);
        },
        error : function(){
            console.log("error")
        }
    })
}

getData("../mock/data.json")

// 
function bindClick(){

    // 自己定义一个事件
        $scope.on('play:change',function(event,index,flag){
            audio.setAudioSource(dataList[index].audio);
            root.render(dataList[index]);
            root.processor.renderEndTime(dataList[index].duration);
            if(audio.status == 'play'){
               
                root.processor.timeInit();
                clearInterval(reqA);
                root.processor.cancelReq();
                $('.currentTime').html('00:00');
                audio.play();
                audio.playingTime = 0;
                reqA = setInterval(function(){
                    audio.playingTime += 1;
                    var duration = audio.playingTime;
                    $scope.find('.currentTime').html(dealTime(duration));
                },1000)  //  定时器
                root.processor.renderProcessorDot(dataList[index].duration);
            }else{
                root.processor.timeInit();
                clearInterval(reqA);
                root.processor.cancelReq();
                $('.currentTime').html('00:00');
            }   
        })

    // 控制歌曲前后切换
    $scope.find('.pre-btn').on('click',function(){
        var index = indexControl.currentIndex(-1);
        $scope.trigger('play:change',index);
    })

    $scope.find('.next-btn').on('click',function(){
       var index = indexControl.currentIndex(1);
       $scope.trigger('play:change',index);
    })

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

    $scope.find('.play-btn').on('click',function(){
        if(audio.status == 'pause'){
            audio.play();
            if(!audio.playingTime){
                audio.playingTime = 0
            }

            reqA = setInterval(function(){
                audio.playingTime += 1;
                var duration = audio.playingTime;
                $scope.find('.currentTime').html(dealTime(duration));
            },1000)  //  定时器

            var index = indexControl.currentIndex(0);
            root.processor.renderProcessorDot(dataList[index].duration);
                
            
        }else if(audio.status == 'play'){
            audio.pause();  
            clearInterval(reqA);
            root.processor.cancelReq();
        }
        $(this).toggleClass('playing');
    })

    $scope.on('mousedown','.pro-wrapper',function(e){
        console.log(e.offsetX);
        $scope.on('mousemove','.pro-wrapper',function(e){
            console.log(e.offsetX + " " + 0);
        })
        $scope.on('mouseup',function(){
            $scope.off('mousemove','.pro-wrapper');
            $scope.off('mousedown','.pro-wrapper');
        })
    })
}

bindClick();



