import gulp from 'gulp';
import iconfont from 'gulp-iconfont';


const runTimestamp = Math.round(Date.now() / 1000);


gulp.task('fonts', () => {
  return gulp.src(['src/icons/*.svg'])
    .pipe(iconfont({
      fontName: 'visicons', // required
      appendUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp: runTimestamp,
    }))
    .on('glyphs', (glyphs, options) => {
      // CSS templating, e.g.
      console.log(glyphs, options);
    })
    .pipe(gulp.dest('dist/fonts/'));
});


gulp.task('default', ['fonts']);
