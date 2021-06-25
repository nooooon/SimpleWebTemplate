var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss'); //autoprefixerを使うのに必要
var autoprefixer = require('autoprefixer'); //prefixをつける
var cleanCss = require('gulp-clean-css'); //css圧縮
var browserSync = require('browser-sync');
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var ejs = require("gulp-ejs");
var rename = require('gulp-rename');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var webpackStream = require("webpack-stream");
var webpack = require("webpack");
var config = require('./webpack.config.js');
var env = process.env.NODE_ENV;

var settingFile = require('./setting.js');
var SETTING = settingFile();
var ejsPram;
var runTimestamp = Math.round(Date.now() / 1000);


var paths = {
  outDir: './htdocs/',
  src: {
    sass: ['src/**/*.scss', '!src/**/_*.scss'],
    ejs: ['src/**/*.ejs', '!src/**/_*.ejs'],
    jsEntry: {'js/index': './src/js/index.ts', 'page/js/index': './src/page/js/index.ts'},
    js: ['src/**/*.ts', '!src/**/_*.ts'],
    html: ['src/**/*.html', '!src/**/_*.html'],
  }
}

function sassCompile(){
  return gulp.src(paths.src.sass)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({errLogToConsole: true}))
    .pipe(postcss([ autoprefixer({
      grid: 'autoplace',
      cascade: false
    }) ]))
    .pipe(cleanCss())
    .pipe(rename(function(path){
      path.dirname = path.dirname.replace("sass", "css");
    }))
    .pipe(gulp.dest(paths.outDir));
}

function ejsCompile(){
  return gulp.src(paths.src.ejs)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(ejs({"data": ejsPram}, {}))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(paths.outDir));
}

function jsCompile(done){
  config.entry = paths.src.jsEntry; // entryファイルを書き換える
  if(env === "production" || env === "dev"){
    config.watch = false;
  }
  webpackStream(config, webpack)
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>"),
    }))
  .pipe(gulp.dest(paths.outDir));
  done();
}

// icon font
// TODO:今はgulp4では使えない
function iconfont(){
  return gulp.src(['src/assets/iconfont/*.svg'])
  .pipe(iconfont({
    startUnicode: 0xF001,
    fontName: 'iconfont',
    formats: ['ttf', 'eot', 'woff', 'svg'],
    appendCodepoints: false,
    normalize: true,
    fontHeight: 1000,
    descent: 1000/4,
    timestamp: runTimestamp
  })).on('glyphs', function(glyphs) {
    gulp.src('src/assets/iconfont/template/_icons.scss')
    .pipe(consolidate('lodash', {
      glyphs: glyphs.map(function(glyph) {
        return { fileName: glyph.name, codePoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() };
      }),
      fontName: 'iconfont',
      fontPath: '../fonts/',
      cssClass: 'iconfont'
    }))
    .pipe(gulp.dest('src/assets/sass/foundation'));
  }).pipe(gulp.dest(`${paths.outDir}assets/fonts`));
}

// htmlのみコピー
function htmlCopy() {
  return gulp.src('src/**/*.html', {base: 'src'})
  .pipe(gulp.dest(`${paths.outDir}`));
}

// copy
function copyFiles() {
  return gulp.src('src/**/*.{png,jpg,gif,ico,svg,json}', {base: 'src'})
  .pipe(gulp.dest(paths.outDir));
}


// browser sync
function browserSyncStart(done) {
  browserSync.init({
      server: {
          baseDir: paths.outDir
      }
  });

  done();
}

// reload all browser
function browserSyncReload(done) {
  browserSync.reload();

  done();
}


function watchFiles(){
  gulp.watch([
    paths.outDir + '**/*.html',
    paths.outDir + '**/*.js',
    paths.outDir + '**/*.css'
  ], gulp.series(browserSyncReload));

  gulp.watch(paths.src.html, gulp.series(htmlCopy, browserSyncReload));
  
  // js
  gulp.watch(paths.src.js, gulp.series(jsCompile, browserSyncReload));

  // sass
  gulp.watch(paths.src.sass, gulp.series(sassCompile, browserSyncReload));

  // ejs
  gulp.watch(paths.src.ejs, gulp.series(ejsCompile, browserSyncReload));
}


function dataSetup(done) {
  if(env === "production"){
    paths.outDir = "./dist/";
    ejsPram = SETTING.settingRelease;
  }else if(env === "dev"){
    ejsPram = SETTING.settingDev;
  }else{
    ejsPram = SETTING.settingLocal;
  }
  done();

  console.log('> dataSetup', env);
}

/* 開発モード */
const local = gulp.series(
  dataSetup,
  htmlCopy,
  sassCompile,
  ejsCompile,
  jsCompile,
  copyFiles,
  browserSyncStart,
  watchFiles
);
exports.local = local;


/* ビルド */
const build = gulp.series(
  dataSetup,
  htmlCopy,
  sassCompile,
  ejsCompile,
  jsCompile,
  copyFiles
);
exports.build = build;
