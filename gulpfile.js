var htdocsDir = "./htdocs/";

var gulp = require('gulp');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var pleeease = require('gulp-pleeease');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var globAll = require("glob-all");
var ejs = require("gulp-ejs");
var webpackStream = require("webpack-stream");
var webpack = require("webpack");
var config = require('./webpack.config.js');
var runSequence = require('run-sequence');
var env = process.env.NODE_ENV;

var buildTargets = [
  ``,
  `page/`
];

// task
buildTargets.map((target) => {

  // js
  // console.log('set task >', `${target}js`);
  gulp.task(`${target}js`, function(){
    config.entry['index'] = `./src/${target}js/index.js`;
    // console.log('run task >', `${target}js`,`${htdocsDir}${target}js`);
    return gulp.src('')
      .pipe(webpackStream(config, webpack))
      .pipe(gulp.dest(`${htdocsDir}${target}js`));
  });

  // sass
  // console.log('set task >', `${target}sass`);
  gulp.task(`${target}sass`, function(){
    return gulp.src(`./src/${target}sass/**/*.scss`)
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(sass({errLogToConsole: true}))
      .pipe(pleeease({
        autoprefixer: {
          browsers: ['last 4 versions']
        }
      }))
      .pipe(gulp.dest(`${htdocsDir}${target}css`));
  });

  // ejs
  gulp.task(`${target}ejs` ,function(){
    console.log('run task >', `./src/${target}*.ejs`);
    return gulp.src(`./src/${target}*.ejs`)
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(ejs({}, {}, {"ext": ".html"}))
      .pipe(gulp.dest(`${htdocsDir}${target}`));
  });
});

// html
gulp.task('html', function(){
  return gulp.src('src/**/*.html', {base: 'src'})
  .pipe(gulp.dest(htdocsDir));
});

// copy
gulp.task('copy', function(){
  return gulp.src('src/**/*.{png,jpg,gif,icon}', {base: 'src'})
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


gulp.task('watch', function(){
  gulp.watch([
    htdocsDir + '**/*.html',
    htdocsDir + '**/*.js',
    htdocsDir + '**/*.css'
  ], ['bs-reload']);

  gulp.watch('./src/**/*.html', ['html']);

  buildTargets.map((target) => {
    // js
    gulp.watch(`./src/${target}js/index.js`, [`${target}js`]);

    // sass
    gulp.watch(`./src/${target}sass/**/*.scss`, [`${target}sass`]);

    // ejs
    gulp.watch(`./src/${target}**/*.ejs`, [`${target}ejs`]);
  });
});


gulp.task('default', function(){
  if(env === "release"){
    buildTargets.map((target) => {
      runSequence('copy', 'html', `${target}js`, `${target}sass`, `${target}ejs`);
    });

  }else{
    runSequence(['browser-sync', 'copy', 'watch']);
  }
});
