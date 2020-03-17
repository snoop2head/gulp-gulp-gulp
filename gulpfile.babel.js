import gulp from "gulp";
import gulppug from "gulp-pug";
import del from "del";
import gulpws from "gulp-webserver";
import gulpImg from "gulp-image";

// local routes for files
const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    destination: "build"
  },
  img: {
    src: "src/img/*",
    destination: "build/img"
  }
};

// clearing previous compiled results
export const clear = () => del(["build/"]);

// compiling pug.js to html: https://www.npmjs.com/package/gulp-pug
// compiled results are at ./build
export const pug_to_html = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gulppug())
    .pipe(gulp.dest(routes.pug.destination));

// running webserver function options: https://www.npmjs.com/package/gulp-webserver#options
const webserver = () =>
  gulp.src("build").pipe(gulpws({ livereload: true, open: true }));

// image optimization
// compiled results are at ./build
const img_opt = () =>
  gulp
    .src(routes.img.src)
    .pipe(gulpImg())
    .pipe(gulp.dest(routes.img.destination));

// watch is web reloader on save at .pug files
// watch compilation of pug_to_html task: https://gulpjs.com/docs/en/api/watch
const watch = () => {
  gulp.watch(routes.pug.watch, pug_to_html);
  gulp.watch(routes.img.src, img_opt);
};

// grouping actions: series is sequential and parellel is simultaneous
const prepare = gulp.series([clear, img_opt]);
const assets = gulp.series([pug_to_html]);
const postDev = gulp.parallel([webserver, watch]);

// commence all action groups in the series
export const dev = gulp.series([prepare, assets, postDev]);
