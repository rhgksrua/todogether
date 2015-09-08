var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    nodemon = require('gulp-nodemon');


gulp.task('styles', function() {
  return sass('app/scss/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('app/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'));

});    


gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb);
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);
    // create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});

// Runs server
gulp.task('develop', function() {
    nodemon({
        script: 'server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' }
    });
});

