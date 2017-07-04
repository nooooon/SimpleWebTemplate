var htdocsDir = "./htdocs/";

var gulp = require('gulp');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var pleeease = require('gulp-pleeease');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var webpackStream = require("webpack-stream");
var webpack = require("webpack");
var config = require('./webpack.config.js');


// html
gulp.task('html', function(){
    gulp.src('src/**/*.html', {base: 'src'})
    .pipe(gulp.dest(htdocsDir))
    .pipe(reload({stream:true}));
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
    .pipe(webpackStream(config, webpack))
    .pipe(gulp.dest(htdocsDir + 'js'))
    .pipe(reload({stream:true}));
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




gulp.task('default', ['browser-sync', 'html', 'sass', 'js'], function(){
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/sass/**/*.scss',['sass']);
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch("*.html", ['bs-reload']);
});

gulp.task('release', ['html', 'js', 'sass'], function(){
    
});
