'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import grename from 'gulp-rename';
import tar from 'gulp-tar';
import gzip from 'gulp-gzip';
import replace from 'gulp-replace';
import del from 'del';
import runSequence from 'run-sequence';
import webpack from  'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackDevConfig from './config/webpack.dev.js';
import webpackProductConfig from './config/webpack.product.js';

function onBuild(done) {
    return function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack:build-dev', err);
        }

        gutil.log('[webpack:build-dev]', stats.toString({
            colors: true
        }));

        if (done) {
            done();
        }
    }
}


// The development server (the recommended option for development)
gulp.task('default', ['watch']);

gulp.task('clean:product', (done) => {
    return del(['build'], done);
});

gulp.task('clean:release', (done) => {
    return del(['release'], done);
});

gulp.task('clean', ['clean:product', 'clean:release'], (done) => {
    done();
});

gulp.task('static', () => {         
    gulp.src(['assets/**/*']).pipe(gulp.dest('build'));
});

gulp.task('static:product', ['static'], () => {
    gulp.src('src/templates/product.html')
        .pipe(grename('index.html'))
        .pipe(gulp.dest('build/'));

    gulp.src('config/config.js.tpl')  
        .pipe(grename('config.js'))
        .pipe(gulp.dest('build/')); 
});


gulp.task('static:dev', ['static'], () => {         
    gulp.src('src/templates/dev.html')  
        .pipe(grename('index.html'))
        .pipe(gulp.dest('build/')); 

    gulp.src('config/config.js.tpl')  
        .pipe(grename('config.js'))
        .pipe(replace('{{API_URL}}', 'http://localhost:9060/api/'))
        .pipe(gulp.dest('build/')); 
});

gulp.task('build:product', function(done) {
    var buildWebpackConfig = Object.create(webpackProductConfig);
    var webpackCompiler = webpack(buildWebpackConfig);
    webpackCompiler.run(onBuild(done));
});

gulp.task('product', (callback) => {
    runSequence('clean:product', 'static:product', 'build:product', callback);
});

gulp.task('release:compress', () => {
    return gulp.src('build/*')
        .pipe(tar('bluechords.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('release'))
});

gulp.task('release', (callback) => {
    runSequence('clean:release', 'product', 'release:compress', callback);
});

gulp.task('watch', ['static:dev'], function() {
    const compiler = webpack(webpackDevConfig);
    const server = new WebpackDevServer(compiler, {
        // webpack-dev-server options
        contentBase: './build',
        hot: true,

        // webpack-dev-middleware options
        quiet: false,
        noInfo: false,
        lazy: false,
        filename: 'app.js',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        publicPath: '/assets/',
        headers: {'X-Custom-Header': 'yes'},
        stats: {colors: true},
        historyApiFallback: true
    });
    server.listen(8081, '0.0.0.0');
});

