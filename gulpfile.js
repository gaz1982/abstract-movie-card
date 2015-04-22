//DEFINE TEMPLATE, FRAMEWORK and JQUERY VERSION
var template = 'default',
    location = 'dist',
    framework = 'bootstrap',
    version = '1.11.1'; //1.11.1 for supporting IE6/7/8 OR 2.1.1 for modern browsers

var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    ignore = require('gulp-ignore'),
    concat = require('gulp-concat'),
    newer = require('gulp-newer'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('styles', function() {
  return gulp.src('templates/'+ template +'/less/main.less')
    .pipe(plumber())
    .pipe(less({ style: 'expanded' }))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(location +'/assets/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(location +'/assets/styles'))
    .pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
  return gulp.src(['site/assets/scripts/jquery/jquery-'+ version +'.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'templates/'+ template +'/scripts/*.js'
    ])
    .pipe(plumber())
    .pipe(concat('production.js'))
    .pipe(gulp.dest(location +'/assets/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(location +'/assets/scripts'))
    .pipe(reload({stream:true}));
});


gulp.task('rm', function(callback) {
    del([location +'/assets/styles', location +'/assets/scripts'], callback);
});

gulp.task('browser-sync', function() {
  browserSync({
    proxy: "abstractmoviecard.dev"
  });
});

gulp.task('default', ['rm','browser-sync','watch'], function() {
    gulp.start('styles', 'scripts');
});

gulp.task('watch', function() {
  gulp.watch('templates/'+ template +'/less/**/*.less', ['styles']);
  gulp.watch('templates/'+ template +'/scripts/**/*.js', ['scripts']);
});

gulp.task('watch-styles', function() {
  gulp.watch('templates/'+ template +'/less/**/*.less', ['styles']);
});

gulp.task('watch-scripts', function() {
  gulp.watch('templates/'+ template +'/scripts/**/*.js', ['scripts']);
});
