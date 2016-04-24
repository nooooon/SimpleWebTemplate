var htdocsDir = "./htdocs/";

var gulp = require('gulp');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var pleeease = require('gulp-pleeease');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
//var ejs = require("gulp-ejs");
//var rename = require("gulp-rename");
var webpack = require("gulp-webpack");
var config = require('./webpack.config.js');


// html
gulp.task('html', function(){
    gulp.src('src/**/*.html', {base: 'src'})
    .pipe(gulp.dest(htdocsDir))
    .pipe(reload({stream:true}));
});

// ejs
gulp.task('ejs', function(){
    // gulp.src(['src/ejs/**/*.ejs', '!' + 'src/ejs/**/_*.ejs'])
    //     .pipe(plumber())
    //     .pipe(ejs())
    //     .pipe(rename(function(path){
    //         //errorで.ejsファイルが書き出されるのを防ぐ
    //         path.extname = ".html";
    //     }))
    //     .pipe(gulp.dest(htdocsDir))
    //     .pipe(reload({stream:true}));
});

// sass
gulp.task('sass', function(){
    gulp.src('src/sass/**/*.scss')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass({errLogToConsole: true}))
        .pipe(pleeease({
            autoprefixer: {
                browsers: ['last 4 versions']
            }
        }))
        .pipe(gulp.dest(htdocsDir + 'css'))
        .pipe(reload({stream:true}));
});

// js
gulp.task('js', function(){
    gulp.src('')
    .pipe(webpack(config))
    .pipe(gulp.dest(htdocsDir + 'js'))
    .pipe(reload({stream:true}));
});


// image copy
gulp.task('image', function(){
    gulp.src(['src/images/**/*.{png,jpg,gif,svn,ico}'], {base: 'src'})
        .pipe(changed(htdocsDir))
        .pipe(gulp.dest(htdocsDir));
});


// browser sync
gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: htdocsDir
        }
    });
});

// reload all browser
gulp.task('bs-reload', function(){
    browserSync.reload();
});




gulp.task('default', ['browser-sync', 'ejs', 'html', 'sass', 'js', 'image'], function(){
    gulp.watch('src/ejs/**/*.ejs',['ejs']);
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/sass/**/*.scss',['sass']);
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/images/**/*.{png,jpg,gif,svn,ico}',['image']);
    gulp.watch("*.html", ['bs-reload']);
});

gulp.task('release', ['html', 'ejs', 'sass', 'image'], function(){
    
});
