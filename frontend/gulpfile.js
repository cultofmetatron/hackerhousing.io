var gulp = require("gulp");
var less = require('gulp-less');
var path = require('path');
var jsx = require('gulp-jsx');
var browserifyGulp = require('gulp-browserify');
var _ = require('lodash');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');


var watcher = function(src, watchsrc, cb) {
  if (arguments.length == 2) {
    cb = watchsrc;
    watchsrc = src;
  }

  return cb(gulp.src(src)
            .pipe(plumber())
            .pipe(watch(watchsrc, cb)));
}


var jsTask = function() {
  var src = 'src/js/app.js';
  var watchsrc = 'src/js/**/*.js';
  return watcher(src, watchsrc, function(files) {
    return files.pipe(browserifyGulp({
      transform: ["reactify"],
      extensions: ['.js', '.jsx']
    }))
    .pipe(gulp.dest('./public/js'));
  });
};

var jsTask2 = function() {
  var src = './src/js/app.js';
  var watchsrc = './src/js/**/*.js';
  var bundler = browserify(src, {basedir: __dirname})
  bundler.transform(reactify);
  var stream = bundler.bundle();
  return stream
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/js'))
}

gulp.task('javascript', jsTask2);
gulp.task('js-watch', function() {
  var watchsrc = './src/js/**/*.js';
  gulp.watch(watchsrc, ['javascript']);
})

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

//it just copies shit so we don't really need to run it on fileserves
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

gulp.task('server', ['serve', 'html', 'js-watch', 'less']);

