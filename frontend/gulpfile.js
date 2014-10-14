var gulp = require("gulp");
var less = require('gulp-less');
var path = require('path');
var jsx = require('gulp-jsx');
var _ = require('lodash');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var livereload = require('gulp-livereload');

var watcher = function(src, watchsrc, cb) {
  if (arguments.length == 2) {
    cb = watchsrc;
    watchsrc = src;
  }

  return cb(gulp.src(src)
            .pipe(plumber())
            .pipe(watch(watchsrc, cb)));
}

var handleError = function() {
  return function(err) {
    console.log(err);
  }
};


function scripts(watch) {
  var bundler, rebundle;
  bundler = browserify(['./app.js'], {
    basedir: path.join(__dirname, 'src', 'js'),
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  });
  if(watch) {
    bundler = watchify(bundler)
  }
 
  bundler.transform(reactify);
  bundler.on('update', rebundle);
  function rebundle() {
    console.log('triggering rebundle')
    return bundler.bundle()
      .on('error', handleError('Browserify'))
      .pipe(source('app.js'))
      .pipe(gulp.dest('./public/js'));
  };
 
  return rebundle();
}

var jsTask = function() {
  return scripts(true);
};

var jsTask2 = function() {
  var src = './src/js/app.js';
  var watchsrc = ['./src/js/**/*.js','./src/js/**/*.jsx'];
  return watcher(src, watchsrc, function(files) {
    //files.
  })
}

gulp.task('js-watch', jsTask);


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

gulp.task('serve2', function() {
  livereload.listen();
  gulp.watch('public/**').on('change', livereload.changed)
  
})


gulp.task('build', ['less', 'html', 'js-watch', 'fonts']);

gulp.task('server', ['serve', 'serve2',  'html', 'js-watch', 'less']);

