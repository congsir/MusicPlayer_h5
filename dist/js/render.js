(function($,root){
    var $scope = $(document.body);

    //  渲染歌曲信息
    function renderMusic(data){
        
        var html = `<div class="music-name">${data.song}</div>
        <div class="singer-name">${data.singer}</div>
        <div class="album-name">${data.album}</div>`;

        $scope.find('.music-info').html(html);    
    }

    //  渲染歌曲图片背景
    function renderBackground(src){
        var img = new Image();
        img.onload = function(){
            root.blurImg(img,$scope);
        }
        img.src = src;
        
    }

    // 渲染歌曲封面图片
    function renderImg(src){
        var img = `<img src="${src}" alt="">`;
        $scope.find('.img-wrapper').html(img);
    }

    //  渲染下方控制栏
    function renderControl(isLike){
        if(isLike){
            $scope.find('.like-btn').addClass('liking');
        }else{
            $scope.find('.like-btn').removeClass('liking');
        }
    }



    root.render = function(data){
        renderMusic(data);
        renderBackground(data.image);
        renderImg(data.image);
        renderControl(data.isLike);
    }
})(window.Zepto,window.player || (window.player = {}))