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

// sass
gulp.task('sass', function () {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(pleeease({
            autoprefixer: {
                browsers: ['last 2 versions']
            }
        }))
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});

// js-library-uglify
gulp.task('library-uglify', function(){
    var files = mainBowerFiles({checkExistence:true});
    console.log(files);
    gulp.src(files)
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

// js-concat-uglify
gulp.task('js', function() {
    gulp.src(['src/js/*.js'])
        .pipe(plumber())
        .pipe(concat('index.js'))
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest('js'))
        .pipe(reload({stream:true}));
});

// imagemin
gulp.task('imagemin', function() {
    gulp.src(['src/images/**/*.{png,jpg,gif}'])
        .pipe(changed('images'))
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest('images'));
});

// browser sync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// reload all browser
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync', 'library-uglify'], function() {
    gulp.watch('src/sass/**/*.scss',['sass']);
    gulp.watch('src/js/*.js',['js']);
    gulp.watch('src/images/**/*.{png,jpg,gif}',['imagemin']);
    gulp.watch("*.html", ['bs-reload']);
});