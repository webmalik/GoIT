const gulp          = require("gulp");
const sass          = require("gulp-sass");
const autoprefixer  = require("gulp-autoprefixer");
const plumber       = require('gulp-plumber');
const notify        = require('gulp-notify');
const gcmq          = require('gulp-group-css-media-queries');
const replace       = require('gulp-string-replace');
const rename        = require('gulp-rename');

gulp.task("sass", () => {
    const src = "./*/scss/*.scss";
    const dest = "./";

    return gulp.src( src )
        .pipe( plumber({ errorHandler: function(err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message:  err.toString()
                })(err);
            }}) )
        .pipe( sass() )
        .pipe( autoprefixer(
            ['last 2 versions'],
            { cascade: false }
        ) )
        .pipe( gcmq() )
        .pipe( replace(/content\s*:\s*("|')[^\\"']+("|')/g, data => {
            const contentVal    = data.match(/("|')[^\\"']+("|')/i);
            let rawVal          = contentVal[0].match(/[^\\"']+/i);
            rawVal              = escape(rawVal).toLowerCase().replace(/%u/g, "\\");
            return "content: \"" + rawVal + "\";";
        }) )
        .pipe( rename( file => {
            file.dirname = file.dirname.replace(/scss$/, "css");
        }) )
        .pipe( gulp.dest( dest ) )
        .pipe( gulp.dest( dest ) )
        .pipe( notify({ message: 'Styles task complete', onLast: true }) );
});
