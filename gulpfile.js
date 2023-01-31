const gulp = require('gulp');
const babel = require('gulp-babel');
const rimraf = require('gulp-rimraf');
const flatten = require('gulp-dot-flatten');
const screeps = require('gulp-screeps');
// const credentials_local = require('./credentials_local');

const scriptSelectorSrc = 'src/**/*.js';
const scriptSelectorDist = 'dist/**/*.js';

gulp.task('rimraf', (done) => {
	gulp.src(scriptSelectorDist, { read: false })
		.pipe(rimraf());
	done();
});

gulp.task('distribute', (done) => {
	gulp.src(scriptSelectorSrc)
		.pipe(babel())
		.pipe(flatten())
		.pipe(gulp.dest('dist'));
	done();
});

gulp.task('test', (done) => {
	gulp.src(scriptSelectorSrc)
		.pipe(babel())
		.pipe(flatten())
		.pipe(gulp.dest('../../Library/Application Support/Screeps/scripts/127_0_0_1___21025/default'));
	done();
});

//default-task
gulp.task('default', gulp.series('rimraf', 'test', function watcher() {
	gulp.watch(scriptSelectorSrc, gulp.series('rimraf', 'test'));
}));