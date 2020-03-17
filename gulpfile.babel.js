import gulp from "gulp";
import gulppug from "gulp-pug";
import del from "del";
import gulpws from "gulp-webserver";

// transfer source file in pug to html file in destination
const routes = {
  pug: {
    src: "src/*.pug",
    destination: "build"
  }
};

// running webserver function options: https://www.npmjs.com/package/gulp-webserver#options
const webserver = () =>
  gulp.src("build").pipe(gulpws({ livereload: true, open: true }));

// compiling pug.js to html: https://www.npmjs.com/package/gulp-pug
export const pug_to_html = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gulppug())
    .pipe(gulp.dest(routes.pug.destination));

// clearing previous compiled results
export const clean = () => del(["build/"]);
const prepare = gulp.series([clean]);

// compiled results are at ./build
const assets = gulp.series([pug_to_html]);

const postDev = gulp.series([webserver]);

// commence prepare + assets actions
export const dev = gulp.series([prepare, assets, postDev]);
