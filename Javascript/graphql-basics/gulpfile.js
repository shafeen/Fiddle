const gulp = require('gulp');
const browserify = require('browserify');
const log = require('gulplog');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

gulp.task('js', function () {

    return gulp.src('./public/**/*.js', {read: false}) // no need of reading file because browserify does.
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


        // write sourcemaps
        .pipe(sourcemaps.write('./'))

        .pipe(gulp.dest('./public/build'));

});
