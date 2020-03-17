import gulp from "gulp";
import gulppug from "gulp-pug";
import del from "del";
import gulpws from "gulp-webserver";

// transfer source file in pug to html file in destination
const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    destination: "build"
  }
};

// clearing previous compiled results
export const clean = () => del(["build/"]);

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

// watch is web reloader on save at .pug files
// watch compilation of pug_to_html task: https://gulpjs.com/docs/en/api/watch
const watch = () => {
  gulp.watch(routes.pug.watch, pug_to_html);
};

// grouping actions: series is sequential and parellel is simultaneous
const prepare = gulp.series([clean]);
const assets = gulp.series([pug_to_html]);
const postDev = gulp.parallel([webserver, watch]);

// commence all actions in the series
export const dev = gulp.series([prepare, assets, postDev]);
