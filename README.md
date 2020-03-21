# Gulp-Gulp-Gulp

### [🥤 Gulp Tasks in this repository](./gulpfile.babel.js)

- [x] Compiling Pug.js -> ugly HTML
- [x] Compiling New JavaScript -> Old JavaScript
- [x] Running webserver
- [x] Compiling SCSS -> ugly CSS
- [x] Uploading to github automization

### [🎒 Refer to Nomad Coders GitHub](https://github.com/nomadcoders/super-gulp)



## 🥤 SCSS Initialization

- SCSS is preprocessor for CSS
- sass compiles SCSS into CSS
- with SCSS, you can make CSS like a programming language

### [Initialize with npm and yarn](https://youtu.be/DT5uy4n28p8?t=349)

- Following commands can initialize scss development environment in other projects also.
- Dependencies that are limited to this project are described in separate sections

```shell
npm init
npm install gulp-cli -g
npm install gulp gulp-sass gulp-csso node-sass gulp-autoprefixer del -D
npx -p touch nodetouch gulpfile.js
```

```shell
yarn init
yarn add @babel/{register,core,preset-env}
yarn add gulp gulp-sass gulp-csso node-sass gulp-autoprefixer del -D
```

### [Adding babel to project instruction](https://www.youtube.com/watch?v=pd210a1Tl74&feature=emb_title)

- add script to package.json

```json
"scripts": {
    "dev": "gulp dev"
  },
```

- manually make babelrc file

```javascript
{
  "presets": ["@babel/preset-env"]
}
```

- change file name of previously created gulpfile.js -> gulpfile.babel.js

### Testing Environment setup

```shell
gulp dev
yarn dev
```





## 🏁 Import gulp for gulpfile.babel.js

```javascript
import gulp from "gulp";
```

## Compile Pug.js -> ugly HTML

- [compile pug files to html files using gulp-pug](https://www.npmjs.com/package/gulp-pug)

```shell
yarn add gulp-pug -D
```

```javascript
// compiled results are at ./build
import gulppug from "gulp-pug";

export const pug_to_html = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gulppug())
    .pipe(gulp.dest(routes.pug.destination));
```

## Compile New JavaScript -> Old JavaScript

- [javascript actions using browserify](https://www.npmjs.com/package/gulp-bro#browserify-transforms)
- Using babelify to use new javascript
- transforming babel (./src/js/main.js) into ugly javascript (./build/js/main.js) using uglifyify
- underscore _ means don't compile that file [example: _reset.scss](https://meyerweb.com/eric/tools/css/reset/)

```shell
yarn add gulp-bro
```

```javascript
import browserify from "gulp-bro";
// babelify is added with @babel/core
import babelify from "babelify";

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
```

## Run webserver

- [running webserver function options](https://www.npmjs.com/package/gulp-webserver#options)

```shell
yarn add gulp-webserver
```

```javascript
import gulpws from "gulp-webserver";

const webserver = () =>
  gulp.src("build").pipe(gulpws({ livereload: true, open: true }));
```

## Compile SCSS -> ugly CSS

- [using sass to compile style.scss file -> style.css file](https://www.npmjs.com/package/gulp-sass)
- [using autoprefixer for browser compatibility](https://github.com/browserslist/browserslist)
- [using csso to minify CSS for compressing bytes of style.css file](https://www.npmjs.com/package/gulp-csso#api)

```javascript
import sass from "gulp-sass";
import autoprefix from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";

sass.compiler = require("node-sass");

const scssStyles = () =>
  gulp
    .src(routes.scss.src)
    // don't kill entire server, just notify errror
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefix({ overrideBrowserslist: ["last 2 Chrome versions"] }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(routes.scss.destination));
```

## Optimize Image 

- [using gulp-image to compress image for its optimized usage on web browser](https://www.npmjs.com/package/gulp-image)

```javascript
import gulpImg from "gulp-image";

// compiled results are at ./build
const img_opt = () =>
  gulp
    .src(routes.img.src)
    .pipe(gulpImg())
    .pipe(gulp.dest(routes.img.destination));
```

## Upload to github automization

- clearing previously compiled results & published cache using del
- [deploy on github using ghPages](https://www.npmjs.com/package/gulp-gh-pages#usage)

```shell
yarn add gulp-gh-pages
```

```javascript
import del from "del";
import ghPages from "gulp-gh-pages";

export const clear = () => del(["build/", ".publish/"]);
const githubDeploy = () => gulp.src("build/**/*").pipe(ghPages());
```

## Watch Instance

- [watch is web reloader on save at designated tasks](https://gulpjs.com/docs/en/api/watch)

```javascript
const watch = () => {
  gulp.watch(routes.pug.watch, pug_to_html);
  gulp.watch(routes.img.src, img_opt);
  gulp.watch(routes.scss.watch, scssStyles);
  gulp.watch(routes.js.watch, jsAction);
};
```

## Grouping Tasks

- grouping tasks: series is sequential and parellel is simultaneous

```javascript
const prepare = gulp.series([clear, img_opt]);
const compileAssets = gulp.series([pug_to_html, scssStyles, jsAction]);
const liveActions = gulp.parallel([webserver, watch]);
```

## 🏁 Commence task groups

- commence all action groups in the series, using yarn

```javascript
export const build = gulp.series([prepare, compileAssets]); // yarn build
export const dev = gulp.series([build, liveActions]); // yarn dev
export const deploy = gulp.series([build, githubDeploy, clear]); // yarn deploy
```



### [Check for Modules dependency](./package.json)

