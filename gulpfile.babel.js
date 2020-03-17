import gulp from "gulp";
import gulpPug from "gulp-pug";

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
    .pipe(gulpPug())
    .pipe(gulp.dest(routes.pug.destination));

// results are at ./build
export const dev = gulp.series([pug_to_html]);
