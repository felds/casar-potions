// General and Utils
// -----------------
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const livereload = require('gulp-livereload');
// CSS
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');



// Error handling
// --------------
const handle_error = notify.onError({
    title: "Oops!",
    message: "<%= error.message %>",
});
const plumber_notifier = ()=>
    plumber({ errorHandler: handle_error });



// Application tasks
// -----------------
gulp.task('sass', [],  function () {
    return gulp.src('sass/**/*.s[ac]ss')
        .pipe(plumber_notifier())
        .pipe(sass({
            style: 'expanded',
            includePaths: [
                'node_modules/bootstrap/scss/'
            ],
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'))
        .pipe(livereload())
    ;
});



// Main task
// ---------
gulp.task('default', [
    'sass',
], function () {
    livereload.listen();
    gulp.watch('sass/**/*.s[ac]ss', [ 'sass' ]);
});

