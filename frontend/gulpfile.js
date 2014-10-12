var gulp = require("gulp");
var less = require('gulp-less');
var path = require('path');
var jsx = require('gulp-jsx');
var browserify = require('gulp-browserify');
var _ = require('lodash');

gulp.task('javascript', function() {
  return gulp.src('src/js/app.js')
    .pipe(browserify({
      transform: ["reactify"],
    }))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('less', function() {
  return gulp.src('./src/styles/stylesheet.less')
    .pipe(less())
    .pipe(gulp.dest('./public/styles'));
});

var templates = [
  'index'
];

gulp.task('html', function() {
  return gulp.src(_.map(templates, function(template) {
    return './src/templates/' + template + '.html'
  }))
  .pipe(gulp.dest('./public'));
})

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**/*')
  .pipe(gulp.dest('./public/fonts'))
})

//watcher


//server
var serve = require('gulp-serve');
gulp.task('serve', serve({
  root: 'public',
  port: 8080
})); 

gulp.task('default', ['less', 'html', 'javascript']);


