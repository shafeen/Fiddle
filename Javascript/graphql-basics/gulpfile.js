const gulp = require('gulp');
const browserify = require('browserify');
const log = require('gulplog');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglifyEs = require('gulp-uglify-es').default;

gulp.task('js', function () {
    let fileGlobs = ['./public/js/*.js'];
    return gulp.watch(fileGlobs, () => {
        console.log('rebuilding: %s', new Date());
        return gulp.src(fileGlobs, {read: true}) // no need of reading file because browserify does.
            // transform file objects using gulp-tap plugin
            .pipe(tap(function (file) {
                log.info('bundling ' + file.path);
                // replace file contents with browserify's bundle stream
                file.contents = browserify(file.path, {debug: true}).bundle();
            }))
            // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
            .pipe(buffer())
            // load and init sourcemaps
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglifyEs({mangle: false}))
            // write sourcemaps to path relative to destination
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./public/build'));
    });
});
gulp.task('minjs', ['js'], function () {

    return gulp.src('./public/js/*.js', {read: true})
        .pipe(uglifyEs())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('./public/build/min/'));
});
