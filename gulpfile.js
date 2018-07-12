var gulp = require("gulp"),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload')

gulp.task("sass",function(){
	gulp.src("empolder/sass/*.scss")
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest("static/css/"))
	.pipe(livereload());
});


gulp.task("watch",function(){
	livereload.listen();
	gulp.watch("empolder/**/*.scss",['sass']);
})