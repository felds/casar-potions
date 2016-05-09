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
// JS
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');



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

const get_browserify_task_func = (in_file, out_file) => () => {
    return browserify({
        entries: [ `./js-source/${in_file}` ],
        debug: false,
    })
        // stage 0 = the awesomest stuff out there
        // @link http://babeljs.io/docs/plugins/preset-stage-0/
        // @link http://giphy.com/gifs/badass-fHR0X5PiXsUSY
        .transform("babelify", {
            presets: [
                "es2015",
                "react",
                "stage-0",
            ],
        })
        .bundle()
        .on('error', handle_error)
        .pipe(source(out_file))
        .pipe(gulp.dest('js/'))
        .pipe(livereload())
    ;
};
gulp.task('browserify-dashboard', [], get_browserify_task_func('dashboard.jsx', 'dashboard.bundle.js'));
gulp.task('browserify', [
    'browserify-dashboard',
]);


// Main task
// ---------
gulp.task('default', [
    'sass',
    'browserify',
], function () {
    livereload.listen();
    gulp.watch('sass/**/*.s[ac]ss', [ 'sass' ]);
    gulp.watch('js-source/**/*.js*', [ 'browserify-dashboard' ]);
});
