var htdocsDir = "./htdocs/";

var gulp = require('gulp');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var mainBowerFiles = require("main-bower-files");
var plumber = require("gulp-plumber");

// html
gulp.task('html', function(){
    gulp.src('src/**/*.html', {base: 'src'})
    .pipe(gulp.dest(htdocsDir))
    .pipe(reload({stream:true}));
});

// sass
gulp.task('sass', function () {
    gulp.src('src/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass({errLogToConsole: true}))
        .pipe(pleeease({
            autoprefixer: {
                browsers: ['last 4 versions']
            }
        }))
        .pipe(gulp.dest(htdocsDir + 'css'))
        .pipe(reload({stream:true}));
});

// js-lib
gulp.task('js-lib', function(){
    var files = mainBowerFiles({checkExistence:true});
    console.log(files);
    
    gulp.src(files)
        .pipe(gulp.dest(htdocsDir + 'js/libs'));
        
    gulp.src(['src/js/libs/*.js'])
        .pipe(gulp.dest(htdocsDir + 'js/libs'));
});

// js
gulp.task('js', function() {
    gulp.src(['src/js/**/*.js', '!src/js/libs/*.js'])
        .pipe(plumber())
        .pipe(concat('index.js'))
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest(htdocsDir + 'js'))
        .pipe(reload({stream:true}));
});

// imagemin
gulp.task('imagemin', function() {
    gulp.src(['src/images/**/*.{png,jpg,gif,ico}'])
        .pipe(changed('images'))
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest(htdocsDir + 'images'));
});

// copy (except for css,js,img)
gulp.task('copy', function(){
    //gulp.src(['****'], {base: 'src'})
        //.pipe(gulp.dest(htdocsDir));
});

// browser sync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: htdocsDir
        }
    });
});

// reload all browser
gulp.task('bs-reload', function () {
    browserSync.reload();
});




gulp.task('default', ['browser-sync', 'js-lib'], function() {
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/sass/**/*.scss',['sass']);
    gulp.watch('src/js/*.js',['js']);
    gulp.watch('src/images/**/*.{png,jpg,gif,ico}',['imagemin']);
    gulp.watch("*.html", ['bs-reload']);
});

gulp.task('release', ['html', 'sass', 'js-lib', 'js', 'imagemin'], function(){
    
});
