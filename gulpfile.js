// Adiciona os modulos instalados
const gulp =  require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Função para compilar o SASS e adicionar os prefixos
function compilaSass() {
  return gulp
  .src('assets/sass/**/*.scss')
  .pipe(sass())
  .pipe(autoprefixer({
    cascade: false
    }))
  .pipe(gulp.dest('assets/css/'))
  .pipe(browserSync.stream());
}

// Tarefa de GULP para função de SASS
exports.compilaSass = compilaSass;

// Função para juntar o JS
function gulpJS() {
  return gulp
  .src('assets/js/main/*.js')
  .pipe(concat('main.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('assets/js/'))
  .pipe(browserSync.stream());
}

// Tarefa para executar a função gulpJS
exports.gulpJS = gulpJS;


// Função para juntar os plugins externos
// function pluginJS(){
//   return gulp
//   .src([
//     'node_modules/jquery/dist/jquery.min.js',
//     'node_modules/swiper/swiper-bundle.min.js',
//     'assets/js/plugins/*.js',
//   ])
//   .pipe(concat('plugins.js'))
//   .pipe(gulp.dest('assets/js/'))
//   .pipe(browserSync.stream())
// }

// Tarefa para executar a função PluginJS
// exports.pluginJS = pluginJS;

// Função para iniciar o browser
function browser() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

// Tarefa para iniciar o browser-sync
exports.browser = browser;

// Função de watch do gulp
function watch() {
  gulp.watch('assets/sass/**/*.scss', compilaSass);
  gulp.watch(['assets/js/main/**/*.js'], gulpJS);
  // gulp.watch(['assets/js/plugins/**/*.js'], pluginJS);
  gulp.watch(['*.html']).on('change', browserSync.reload);
}

// Inicia a tarefa de watch
exports.watch = watch;

// Tarefa padrão do gulp que inicia o watch e o browser-sync
exports.default = gulp.parallel(watch, browser, compilaSass, gulpJS);