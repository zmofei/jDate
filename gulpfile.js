var gulp = require('gulp');
var rollup = require('gulp-rollup');
var babel = require('rollup-plugin-babel');


gulp.task('default', function() {
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
});

var watcher = gulp.watch('./src/**/*.js', ['default']);