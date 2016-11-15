var gulp         = require('gulp'),
    less         = require('gulp-less'),
    cssmin       = require('gulp-minify-css'),
    jsmin        = require('gulp-uglify'),
    rename       = require("gulp-rename");
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync').create(),
    reload       = browserSync.reload;
    
gulp.task('serve', ['less', 'javascript', 'watch'], function () {
  browserSync.init({
    server: './'
  });
});

gulp.task('less', function () {
  gulp.src('src/less/style.less')
      .pipe(less())
      .pipe(autoprefixer())
      .pipe(gulp.dest('public/css'))
      .pipe(reload({stream: true}));
});

gulp.task('javascript', function () {
  gulp.src('src/js/*.js')
    .pipe(gulp.dest('public/js'))
    .pipe(reload({stream: true}));
  gulp.src('src/js/module/*.js')
    .pipe(gulp.dest('public/js/module'))
    .pipe(reload({stream: true}));;
})

gulp.task('compress', function () {
  gulp.src('src/less/style.less')
      .pipe(less())
      .pipe(autoprefixer())
      .pipe(cssmin())
      .pipe(rename({ extname: ".min.css" }))
      .pipe(gulp.dest('public/css'));
  gulp.src('src/js/*.js')
      .pipe(jsmin())
      .pipe(rename({ extname: ".min.js" }))
      .pipe(gulp.dest('public/js'));
})

gulp.task('watch', function () {
  gulp.watch(['src/less/*.less', 'src/less/module/*.less'], ['less']);
  gulp.watch(['src/js/*.js', 'src/js/module/*.js'], ['javascript']);
  gulp.watch(['view/*.html'], function () {
    reload()
  })
})

gulp.task('default', ['serve']);
 