import gulp from "gulp";
import pug from "gulp-pug";
import del from "del";

// transfer source file in pug to html file in destination
const routes = {
  pug: {
    src: "src/*.pug",
    destination: "build"
  }
};

export const pug_to_html = () =>
  gulp
    .src(routes.pug.src)
    .pipe(pug())
    .pipe(gulp.dest(routes.pug.destination));

// clearing previous compiled results
export const clean = () => del(["build"]);
const prepare = gulp.series([clean]);

// compiled results are at ./build
const assets = gulp.series([pug_to_html]);

// commence prepare + assets actions
export const dev = gulp.series([prepare, assets]);
