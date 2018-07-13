var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');            //  debuger
var concat = require('gulp-concat');                    //  合并多个js 文件
var deporder = require('gulp-deporder');                // 合并js文件可以根据注释依赖顺序合并
var less = require('gulp-less');                        // 将less文件转化为css文件
var postcss = require('gulp-postcss');                  //  一个综合执行插件的工具
var autoprefixer = require('autoprefixer');             //  css3前缀
var cssnano = require('cssnano');                       //  压缩CSS代码
var connect = require('gulp-connect');                  // 开启服务器


var folder = {
    src : "src/",
    dist : "dist/"
}

// 流操作
gulp.task("html",function(){                // 任务名称与任务执行函数
    gulp.src(folder.src + 'html/*')         // 读取文件
        .pipe(connect.reload())
        .pipe(htmlclean())                  // 执行压缩html模块
        .pipe(gulp.dest(folder.dist + 'html/'))  // 输出文件
})

gulp.task("images",function(){
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "images/"))
})

gulp.task('js',function(){
    gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest(folder.dist + 'js/'))
})

gulp.task('css',function(){
    gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postcss([
            autoprefixer(),
            cssnano(),
        ]))
        .pipe(gulp.dest(folder.dist + 'css/'))
})

gulp.task("watch",function(){
    gulp.watch(folder.src + 'html/*',["html"]);
    gulp.watch(folder.src + 'images/*',["images"]);
    gulp.watch(folder.src + 'js/*',["js"]);
    gulp.watch(folder.src + 'css/*',["css"]);
})

gulp.task('server',function(){
    connect.server({
        port: '8080',
        livereload: true
    });
})

gulp.task("default",["html","images","js","css","watch","server"])