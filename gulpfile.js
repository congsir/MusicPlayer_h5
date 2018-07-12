var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');


var folder = {
    src : "src/",
    dist : "dist/"
}

gulp.task("html",function(){                // 任务名称与任务执行函数
    gulp.src(folder.src + 'html/*')         // 读取文件
        .pipe(htmlclean())                  // 执行压缩html模块
        .pipe(gulp.dest(folder.dist + 'html/'))  // 输出文件
})

gulp.task("images",function(){
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "images/"))
})

gulp.task("default",["html","images"])