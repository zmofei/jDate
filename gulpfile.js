var gulp = require('gulp');
var rollup = require('gulp-rollup');
var babel = require('rollup-plugin-babel');


gulp.task('default', ['js', 'css'], function() {
});

gulp.task('js', function() {
    gulp.src('./src/**/*.js')
        .pipe(rollup({
            entry: './src/jDate.js',
            plugins: [
                babel()
            ]
        }))
        .on('error', function() {
            console.log('error', arguments)
        })
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/jDate.css')
        .pipe(gulp.dest('./dist/jData.css'));
});

gulp.task('css', function() {
    gulp.src('./src/jDate.css')
        .pipe(gulp.dest('./dist/'));
});

gulp.watch('./src/**/*.js', ['default']);
gulp.watch('./src/**/*.css', ['default']);