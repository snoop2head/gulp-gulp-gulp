# Gulp-Gulp-Gulp

### [Refer to Nomad Coders GitHub](https://github.com/nomadcoders/super-gulp)

### [Tasks of Gulps](./gulpfile.babel.js)

- [x] Pug.js -> ugly HTML
- [x] New JavaScript -> Old JavaScript
- [x] run webserver
- [x] SCSS -> ugly CSS
- [x] uploading to github automization



## SCSS

- preprocessor for CSS
- SCSS & Saas is compiled into CSS
- with SCSS, you can make CSS like a programming language

### [Initialize with npm and yarn](https://youtu.be/DT5uy4n28p8?t=349)

```shell
npm init
npm install gulp-cli -g
npm install gulp gulp-sass gulp-csso node-sass gulp-autoprefixer del -D
npx -p touch nodetouch gulpfile.js
```

```shell
yarn init
yarn add @babel/{register,core}
yarn add @babel/preset-env
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

- change (previously created) gulpfile.js -> gulpfile.babel.js

### Testing Environment setup

```shell
gulp dev
yarn dev
```



### [Modules dependency](./package.json)

- gulp uses pipe()

- [compile pug files to html files](https://www.npmjs.com/package/gulp-pug)

  ```shell
  yarn add gulp-pug -D
  ```

- [run server](https://www.npmjs.com/package/gulp-webserver#usage)

  ```shell
  yarn add gulp-webserver
  ```

- [image optimization](https://www.npmjs.com/package/gulp-image)

  ```shell
  yarn add gulp-image
  ```

- [node sass](https://github.com/sass/node-sass)

  ```shell
  yarn add node-sass
  ```

  - underscore _ means don't compile that file
  - [example: _reset.scss](https://meyerweb.com/eric/tools/css/reset/)

- [browserify](https://www.npmjs.com/package/gulp-bro#usage)

