const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const fileinclude = require('gulp-file-include');

// Функция для включения HTML файлов
function includeHTML() {
  return src('app/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// Функция для инициализации BrowserSync
function initBrowserSync() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
}

// Функция для очистки папки dist
function cleanDist() {
  return del('dist');
}

// Функция для обработки изображений
function images() {
  return src('app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
    .pipe(browserSync.stream());
}

// Функция для компиляции и объединения JavaScript файлов
function scripts() {
  return src([
    'node_modules/swiper/swiper-bundle.min.js', // Подключаем Swiper JS
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js')) // Объединяем в один файл
    .pipe(uglify()) // Минифицируем JavaScript
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// Функция для компиляции SCSS в CSS
function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' })) // Компилируем SCSS в CSS
    .pipe(concat('style.min.css')) // Объединяем в один файл
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

// Функция для копирования шрифтов
function fonts() {
  return src('app/fonts/**/*') // выбираем все файлы в папке app/fonts
    .pipe(dest('dist/fonts')); // копируем их в dist/fonts
}


// Функция для наблюдения за изменениями в файлах
function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch('app/*.html', includeHTML);
  watch('app/images/**/*', images);
  watch('app/**/*.html').on('change', browserSync.reload);
  watch('app/js/**/*.js').on('change', browserSync.reload);
  watch('app/scss/**/*.scss').on('change', browserSync.reload);
}

// Сборка проекта
exports.build = series(cleanDist, parallel(images, includeHTML, styles, scripts, fonts));
// Задача по умолчанию
exports.default = parallel(initBrowserSync, watching);
