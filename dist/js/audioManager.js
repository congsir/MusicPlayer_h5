(function($,root){
    var $scope = $(document.body);
    function audioManager(src){
        this.audio = new Audio();
        this.status = 'pause';
    }

    audioManager.prototype = {
        bindEvent : function(){
            $(this.audio).on('ended',function(){
                $scope.find('.next-btn').trigger('click');
            })
        },
        play : function(){
            this.status = 'play'; 
            this.audio.play();  
              
        },
        pause : function(){
            this.status = 'pause';
            this.audio.pause();
        },
        setAudioSource : function(src){
            this.audio.src = src;
            this.audio.load();
        },
        jumpToPlay : function(time){
            this.audio.currentTime = time;
            this.play();
        }

    }

    root.audioManager = audioManager;
})(window.Zepto,window.player || (window.player = {}))