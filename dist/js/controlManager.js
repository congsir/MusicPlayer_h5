(function($,root){

    //   控制模块，用于控制歌曲图片前后顺序
    function IndexControl(len){
        this.index = 0;
        this.len = len;
    }

    IndexControl.prototype.currentIndex = function(num){
        var curIndex = (this.index + num + this.len) % this.len;
        this.index += num;
        return curIndex;
    }

    root.IndexControl = IndexControl; 
})(window.Zepto,window.player || (window.player = {}))