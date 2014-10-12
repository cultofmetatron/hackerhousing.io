var gulp = require("gulp");
var less = require('gulp-less');
var path = require('path');
var jsx = require('gulp-jsx');
var browserify = require('gulp-browserify');
var _ = require('lodash');
var watch = require('gulp-watch');

var watcher = function(src, cb) {
  return cb(gulp.src(src).pipe(watch(src, cb)));
}

/*
var jsTask = function() {
  var src = 'src/js/app.js';
  return gulp.src(src)
    .pipe(watch(src, function(files) {
      return files.pipe(browserify({
        transform: ["reactify"],
      }))
      .pipe(gulp.dest('./public/js'));
    }))
    .pipe(browserify({
      transform: ["reactify"],
    }))
    .pipe(gulp.dest('./public/js'));
};
*/

var jsTask = function() {
  var src = 'src/js/app.js';
  return watcher(src, function(files) {
    return files.pipe(browserify({
      transform: ["reactify"],
    }))
    .pipe(gulp.dest('./public/js'));
  });
};


gulp.task('javascript', jsTask);


gulp.task('less', function(options) {
  return watcher('./src/styles/stylesheet.less', function(files) {
    return files
    .pipe(less())
    .pipe(gulp.dest('./public/styles'));
  })
});

var templates = [
  'index'
];

gulp.task('html', function() {
  return watcher(_.map(templates, function(template) {
    return './src/templates/' + template + '.html'
  }), function(files) {
    return files.pipe(gulp.dest('./public'));
  });
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



gulp.task('build', ['less', 'html', 'javascript']);

gulp.task('server', ['serve', 'html', 'javascript', 'less']);

