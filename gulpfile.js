const gulp = require('gulp');
const babel = require('gulp-babel');

function buildDev() {
  return gulp
    .src("./src/server/**/*.js")
    .pipe(
      babel({
        babelrc: false,
        plugins: ["@babel/plugin-transform-modules-commonjs"]
      })
    )
    .pipe(gulp.dest('dist/server'))
}

exports.default = gulp.series(buildDev);