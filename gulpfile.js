const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

const entry = './src/server/**/*.js';

function buildDev() {
  return watch(entry, { ignoreInitial: false })
      .pipe(
        babel({
          babelrc: false,
          plugins: ["@babel/plugin-transform-modules-commonjs"]
        })
      )
      .pipe(gulp.dest('dist/server'))
}

let build = gulp.series(buildDev);

if (process.env.NODE_ENV == 'production') {
  build = gulp.series(buildprod, buildconfig);
}

gulp.task('default', build);