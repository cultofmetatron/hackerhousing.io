var gulp = require("gulp");
var less = require('gulp-less');
var path = require('path');
var jsx = require('gulp-jsx');
var browserify = require('gulp-browserify');



gulp.task('build', function() {
  return gulp.src('src/js/app.js')
    .pipe(browserify({
      transform: ["reactify"],
    }))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('less', function () {
  return gulp.src('./src/styles/stylesheet.less')
    .pipe(less())
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('default', ['less']);
