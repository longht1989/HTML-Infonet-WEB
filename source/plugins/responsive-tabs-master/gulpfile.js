(function() {

  'use strict'

  /**
   * Requirements
   */
  var gulp = require('gulp');
  var autoprefixer = require('gulp-autoprefixer');
  var cssmin = require('gulp-cssmin');
  var concat = require('gulp-concat');
  var jshint = require('gulp-jshint');
  var notify = require("gulp-notify");
  var rename = require('gulp-rename');
  var sass = require('gulp-sass');
  var stylish = require('jshint-stylish');
  var uglify = require('gulp-uglify');

  /**
   * Paths
   */
  var paths = {
    sass: ['./sass/**/*.scss'],
    scripts: ['./js/src/**/*.js']
  };

  /**
   * Styles
   */
  gulp.task('styles', function() {
    return gulp.src(paths.sass)
      .pipe(sass({
        outputStyle: 'expanded'
      }))
      .on('error', notify.onError({
        title: 'Error compiling Sass',
        message: 'Check the console for info'
      }))
      .on('error', sass.logError)
      .pipe(autoprefixer())
      .pipe(gulp.dest('./css'))
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./css'));
  });

  /**
   * Styles watcher
   */
  gulp.task('styles:watch', function() {
    gulp.watch(paths.sass, ['styles']);
  });

  /**
   * Scripts linting
   */
  gulp.task('lint', function() {
    return gulp.src(paths.scripts)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('fail'))
      .on('error', notify.onError({
        title: 'JS hint failed',
        message: 'Check the console for errors'
      }));
  });

  /**
   * Scripts dev
   */
  gulp.task('scripts:watch', function() {
    gulp.watch(paths.scripts, ['lint']);
  });

  /**
   * Final tasks - these are the tasks that should be run from the command line,
   * as they encompass the above.
   */
  gulp.task('default', ['styles', 'lint', 'styles:watch', 'scripts:watch']);
  gulp.task('styles:dev', ['styles', 'styles:watch']);
  gulp.task('scripts:dev', ['lint', 'scripts:watch']);

})();