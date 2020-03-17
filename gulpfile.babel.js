import gulp from "gulp";
import gulppug from "gulp-pug";
import del from "del";
import gulpws from "gulp-webserver";
import gulpImg from "gulp-image";
import sass from "gulp-sass";
import autoprefix from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";

sass.compiler = require("node-sass");

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
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    destination: "build/css/"
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

// image optimization: https://www.npmjs.com/package/gulp-image
// compiled results are at ./build
const img_opt = () =>
  gulp
    .src(routes.img.src)
    .pipe(gulpImg())
    .pipe(gulp.dest(routes.img.destination));

// compiling style.scss file -> style.css file: https://www.npmjs.com/package/gulp-sass
// autoprefixer for browser compatibility: https://github.com/browserslist/browserslist
// minify CSS for compressing bytes of style.css file: https://www.npmjs.com/package/gulp-csso#api
const scssStyles = () =>
  gulp
    .src(routes.scss.src)
    // don't kill entire server, just notify errror
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefix({ overrideBrowserslist: ["last 2 Chrome versions"] }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(routes.scss.destination));

// watch is web reloader on save at .pug files
// watch compilation of pug_to_html task: https://gulpjs.com/docs/en/api/watch
const watch = () => {
  gulp.watch(routes.pug.watch, pug_to_html);
  gulp.watch(routes.img.src, img_opt);
  gulp.watch(routes.scss.watch, scssStyles);
};

// grouping actions: series is sequential and parellel is simultaneous
const prepare = gulp.series([clear, img_opt]);
const compile_assets = gulp.series([pug_to_html, scssStyles]);
const postDev = gulp.parallel([webserver, watch]);

// commence all action groups in the series
export const dev = gulp.series([prepare, compile_assets, postDev]);
