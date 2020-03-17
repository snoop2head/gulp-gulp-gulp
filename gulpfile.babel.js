import gulp from "gulp";
import gulppug from "gulp-pug";
import del from "del";
import gulpws from "gulp-webserver";
import gulpImg from "gulp-image";
import sass from "gulp-sass";
import autoprefix from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import browserify from "gulp-bro";
import babelify from "babelify";
import ghPages from "gulp-gh-pages";

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
  },
  js: {
    watch: "src/js/**/*.js",
    src: "src/js/main.js",
    destination: "build/js"
  }
};

// clearing previously compiled results & published cache
export const clear = () => del(["build/", ".publish/"]);

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

// deploy on github using ghPages: https://www.npmjs.com/package/gulp-gh-pages#usage
const githubDeploy = () => gulp.src("build/**/*").pipe(ghPages());

// javascript actions using browserify + babelify: https://www.npmjs.com/package/gulp-bro#browserify-transforms
// transforming babel (./src/js/main.js) into ugly javascript (./build/js/main.js) using uglifyify
const jsAction = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      browserify({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }]
        ]
      })
    )
    .pipe(gulp.dest(routes.js.destination));

// watch is web reloader on save at designated tasks: https://gulpjs.com/docs/en/api/watch
const watch = () => {
  gulp.watch(routes.pug.watch, pug_to_html);
  gulp.watch(routes.img.src, img_opt);
  gulp.watch(routes.scss.watch, scssStyles);
  gulp.watch(routes.js.watch, jsAction);
};

// grouping actions: series is sequential and parellel is simultaneous
const prepare = gulp.series([clear, img_opt]);
const compileAssets = gulp.series([pug_to_html, scssStyles, jsAction]);
const liveActions = gulp.parallel([webserver, watch]);

// commence all action groups in the series, using yarn
export const build = gulp.series([prepare, compileAssets]); // yarn build
export const dev = gulp.series([build, liveActions]); // yarn dev
export const deploy = gulp.series([build, githubDeploy, clear]); // yarn deploy
