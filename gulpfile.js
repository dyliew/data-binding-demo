"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // run a local dev. server
var open = require('gulp-open'); // open a url in a web browser
var uglify = require('gulp-uglify'); // open a url in a web browser
var buffer = require('vinyl-buffer');
var browserify = require('browserify'); // bundle JS
var reactify = require('reactify'); // transform React JSX to JS
var source = require('vinyl-source-stream'); // use conventional text steams with Gulp
var concat = require('gulp-concat');
var eslint = require('gulp-eslint'); // lint JS files, including JSX

var config = {
    port: 9005,
    devBaseUrl: "http://localhost",
    paths: {
        html: './src/*.html',
        dist: './dist',
        mainJs: './src/main.js',
        js: './src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ]
    }
};

gulp.task('connect', function(){
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function(){
    gulp.src('dist/index.html')
        .pipe(open({
            uri: config.devBaseUrl + ':' + config.port + '/'
        }));
});

gulp.task('html', function(){
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function(){
    browserify([config.paths.mainJs])
        .transform(reactify)
        .bundle()
        .on('error', console.log.bind(console))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function(){
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint', function(){
    return gulp.src(config.paths.js)
        .pipe(eslint({config: 'eslint.config.json'}))
        .pipe(eslint.format());
});

gulp.task('watch', function(){
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['open', 'js', 'css', 'watch', 'html']);
