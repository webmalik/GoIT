# Web Font Library using SCSS

[![NPM](https://nodei.co/npm/scss-fonts.png)](https://nodei.co/npm/scss-fonts/)

[![Build Status](https://travis-ci.org/mvandrew/scss-fonts.svg?branch=master)](https://travis-ci.org/mvandrew/scss-fonts) 
![](https://img.shields.io/npm/v/scss-fonts.svg?label=npm%20package&style=flat)
[![devDependency Status](https://david-dm.org/mvandrew/scss-fontse/dev-status.svg)](https://david-dm.org/mvandrew/scss-fonts#info=devDependencies)

Web-шрифты с описанием подключения в SCSS. Сборник включает в себя шрифты часто применяемые на моих Web-проектах.

Подключение с использованием SCSS позволяет быстро менять относительное расположение файлов шрифта и таблиц стилей.

## Включены шрифты

* Open Sans
* Roboto
* Roboto Slab
* Roboto Mono
* [Font Awesome 4.7.0](https://fontawesome.com/v4.7.0/)
* a_GroticLtNr
* Malgun Gothic
* Museo Sans Cyrl

## Использование скомпилированных версий

У каждого шрифта есть уже собранный CSS-файл подключения шрифтов. Собранные файлы находятся в каталогах шрифтов в подкаталоге css.

Для использования достаточно подключить CSS-файл.

Важное условие при использовании готовых CSS файлов: относительное расположение CSS файла и каталога fonts подключаемого шрифта должно быть соблюдено.

Если расположение fonts относительно CSS отличается от собранной версии, изменить можно подключая SCSS файл, предварительно, изменив соответствующую переменную. Переменные перечислены в файле ```_variables.scss``` в каталогов каждого шрифта.

## Установка

### Установка с использованием пакетных менеджеров

**npm**: 

    $ npm install --save-dev scss-fonts

**yarn**:

    $ yarn add -D scss-fonts

### Включение репозитория к себе в проект

#### Клонирование репозитория

    $ git clone https://github.com/mvandrew/scss-fonts.git src/assets/templates/(Template Name)/fonts
    
#### Добавление подмодуля к репозиторию проекта

    $ git submodule add https://github.com/mvandrew/scss-fonts.git src/assets/templates/(Template Name)/fonts
    
## Сборка проекта с использованием [Gulp](https://gulpjs.com/)

### Копирование файлов шрифтов в release версию

На примере шаблона для CMS [1С-Битрикс](https://www.1c-bitrix.ru/):

```javascript
const gulp                  = require("gulp");
const path                  = require("path");
const plumber               = require('gulp-plumber');
const notify                = require('gulp-notify');

const config                = require("./src/scripts/config");

gulp.task("fonts", () => {
    const fontFiles = [
        path.join(config.template, "font-awesome-4/fonts/*.+(otf|eot|svg|ttf|woff|woff2)"),
        path.join(config.template, "fonts/roboto/fonts/*.+(otf|eot|svg|ttf|woff|woff2)"),
        path.join(config.template, "fonts/robotoslab/fonts/*.+(otf|eot|svg|ttf|woff|woff2)")
    ];
    return gulp.src( fontFiles )
        .pipe( plumber({ errorHandler: function(err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message:  err.toString()
                })(err);
            }}) )
        .pipe( gulp.dest( path.join(config.template_dest, "fonts") ) );
});
``` 

Данные конфигурации взяты из проекта библиотеки скриптов для сборки проекта 1С-Битрикс: [mvandrew/bx-gulp-scripts](https://github.com/mvandrew/bx-gulp-scripts).

В зависимости от проекта, исходные файлы могут располагаться в других каталогах.

### Включение описания шрифтов в таблицы стилей

В каталоге каждого шрифта есть подкаталог ```scss```, который содержит:

* Файл параметров ```_variables.scss```.
* Файл с описанием шрифта ```_font.scss```.
* Файл шрифта ```(название шрифта).scss```.

В самом простом варианте можно или компилировать файл шрифта в соответствующий параметрам каталог или включать его в общий файл ```scss``` проекта/темы.

Кроме этого, можно собирать со своими собственными параметрами, если относительное расположение файлов отличается от предполагаемого в файле параметров.
