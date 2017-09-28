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
var runSequence = require('run-sequence');
var env = process.env.NODE_ENV;


// html
gulp.task('html', function(){
  return gulp.src('src/**/*.html', {base: 'src'})
  .pipe(gulp.dest(htdocsDir));
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
    .pipe(gulp.dest(htdocsDir + 'css'));
});

// js
gulp.task('js', function(){
  gulp.src('')
  .pipe(webpackStream(config, webpack))
  .pipe(gulp.dest(htdocsDir + 'js'));
});

// watch
gulp.task('watch-html', ['html'], function(){
  gulp.watch('src/**/*.html',['html']);
});

gulp.task('watch-sass', ['sass'], function(){
  gulp.watch('src/sass/**/*.scss',['sass']);
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


gulp.task('watch', ['watch-html', 'watch-sass', 'js'], function(){
  gulp.watch([
    'src/**/*.html',
    htdocsDir + '**/*.js',
    htdocsDir + '**/*.css',
  ], ['bs-reload']);
});


gulp.task('default', function(){
  if(env === "release"){
    runSequence('html', 'js', 'sass');
  }else{
    runSequence(['browser-sync', 'watch']);
  }
});
