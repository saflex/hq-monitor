let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');
    gcmq = require('gulp-group-css-media-queries');
    cleanCSS = require('gulp-clean-css');
    imagemin = require('gulp-imagemin');
    // purgecss = require('gulp-purgecss');


gulp.task('clean', async function(){
  del.sync('dist')
})

// gulp.task('purgecss', () => {
//     return gulp.src('app/**/*.css')
//         .pipe(purgecss({
//             content: ['*.html']
//         }))
//         .pipe(gulp.dest('build/css'))
// });

gulp.task('imagemin', function() {
  return gulp.src([
        './app/img/*.png',
        './app/img/*.jpg',
    ])
  .pipe(imagemin())
  .pipe(gulp.dest('app/img'))
});

gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 8 versions']
    }))
    .pipe(gcmq())
    .pipe(cleanCSS({
              level: 2
            }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('css', function(){
    return gulp.src([
        'app/libs/css/jquery.formstyler.css',
        'app/libs/css/animate.css',
        'app/libs/css/bootstrap.css',
    ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('app/scss'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
  return gulp.src([
    'app/libs/js/jquery-2.1.1.js',
    'app/libs/js/jquery.mobile.custom.min.js',
    'app/libs/js/bootstrap.js',
    'app/libs/js/main.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
});

gulp.task('export', function(){
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let BuildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
    
  let BuildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  let BuildImg = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'));  
});

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('dev', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'));