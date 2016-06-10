"use strict";

// *** Below is gulpfile for use with JSHint only. ***
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');

gulp.task('default', ['lint', 'watch']);

gulp.task('watch', function() {
  gulp.watch('./scripts/**/*.js', ['lint']);
});


gulp.task('lint', function() {
  return gulp.src('./scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


// *** Below is gulpfile for use with SASS. ***

// Remember to install this with npm install gulp-sass --save-dev
// Read about it at https://www.npmjs.com/package/gulp-sass
var sass = require('gulp-sass');

gulp.task('default', ['sassify', 'watch']); //<-- Add your sassify task to the default tasks list

gulp.task('watch', function() {
  //Add the sassify task you create below to the watch task. To add it to a watch that's also running jshint
  // you can do this:  gulp.watch(['./javascripts/**/*.js', './sass/**/*.scss' ], ['lint', 'sassify']);
  gulp.watch('./sass/*.scss', ['sassify']); 
});

// This is the task for compiling the SASS to CSS. 
// Make sure you setup a sass folder to write your SASS files in 
// and a css folder for the compiled CSS to be generated in
gulp.task('sassify', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});



























