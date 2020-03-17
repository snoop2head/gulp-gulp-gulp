# Gulp-Gulp-Gulp



### [Tasks of Gulps](./gulpfile.babel.js)

- [x] Pug.js -> ugly HTML
- [x] New JavaScript -> Old JavaScript
- [x] run webserver
- [ ] SCSS -> ugly CSS
- [ ] uploading to github automization

- Initializing Gulp

```shell
yarn add @babel/{register,core}
yarn add @babel/preset-env
```

- run tasks: compile files, run server etc...

```shell
yarn dev
```

### [Modules dependency](./package.json)

- gulp uses pipe()

- compile pug files to html files

  - https://www.npmjs.com/package/gulp-pug

  ```shell
  yarn add gulp-pug -D
  ```

- run server

  - https://www.npmjs.com/package/gulp-webserver#usage

```shell
yarn add gulp-webserver
```

- image optimization

  ```shell
  yarn add gulp-image
  ```

  - https://www.npmjs.com/package/gulp-image

- node sass

  ```shell
  yarn add node-sass
  ```

  - https://github.com/sass/node-sass
  - underscore _ means don't compile that file
  - example: _reset.scss
    https://meyerweb.com/eric/tools/css/reset/

- 

