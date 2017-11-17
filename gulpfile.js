var gulp = require('gulp');
var watch = require('gulp-watch');
var uglifyjs = require('uglify-js');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var inlinesource = require('gulp-inline-source');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var glob = require('glob');

// Config Extend
var configExtend = require('./gulpfile/config');
var testProxy = require('./gulpfile/test-proxy');

// Config Default
var config = Object.assign({
  port: 8001, // 端口
  local: './public/local', // 开发环境
  staging: './public/staging', // 构建环境
  production: './public/production', // 生产环境
  serverRoot: './public', // 服务器目录
  external: ['react', 'react-dom'], // 公用component
}, configExtend)

// 任务结束打印路径信息
function consoleTime(path) { console.log('[' + (new Date()).toString().match(/\d{2}:\d{2}:\d{2}/) + '] ' + path); }

// Liveload
gulp.task('connect', function() {
  connect.server({
    root: config.serverRoot,
    livereload: true,
    port: config.port,
    middleware: function(connect, opt) {
      return [testProxy.handleJsonRequrest];
    }
  })
})

// 监视，游览器实时更新，打包到 staging 目录
gulp.task('watch', function() {
  // html
  watch([config.local + '/**/*.html'], function(e) {
      console.log(e);
      gulp.src(e.path)
        .on('error', function(err) { console.log('html' + err.message); })
        .on('end', function() { consoleTime(e.path) })
        .pipe(gulp.dest(function() {
          var _path = e.path.replace('local', 'staging').split('\\');
          _path.pop();
          return _path.join('\\')
        }))
        .pipe(connect.reload())
    })
    // css
  watch([config.local + '/**/*.css'], function(e) {
      gulp.src(e.path)
        .on('error', function(err) { console.log('css' + err.message); })
        .on('end', function() { consoleTime(e.path) })
        .pipe(autoprefixer())
        .pipe(gulp.dest(function() {
          var _path = e.path.replace('local', 'staging').split('\\');
          _path.pop();
          return _path.join('\\')
        }))
        .pipe(connect.reload())
    })
    // images
  watch([config.local + '/**/*.{gif,jpg,png}'], function(e) {
    gulp.src(e.path)
      .on('error', function(err) { console.log('img' + err.message); })
      .on('end', function() { consoleTime(e.path) })
      .pipe(gulp.dest(function() {
        var _path = e.path.replace('local', 'staging').split('\\');
        _path.pop();
        return _path.join('\\')
      }))
      .pipe(connect.reload())
  })

  // js
  glob(config.local + '/**/js/*.jsx', function(er, files) {
    files.forEach(function(item, index) {
      // common
      if (item.indexOf('common') != -1) return;

      var b = browserify({
          entries: item,
          debug: true,
          cache: {},
          packageCache: {},
          fullPaths: false,
          plugin: [watchify]
        })
        .transform('babelify', {
          presets: ['es2015', 'stage-1', 'react']
        })

      var _item = item.replace('local', 'staging').split('/');
      var _name = _item.pop().replace('jsx', 'js');
      var _path = _item.join('/');

      b.external(config.external);

      var bundle = function() {
        b.bundle()
          .on('error', function(err) { console.log('error: ' + err); })
          .on('end', function() { consoleTime('js: ' + item) })
          .pipe(source(_name))
          .pipe(gulp.dest(_path))
          .pipe(connect.reload())
      }

      b.on('update', function() {
        bundle()
      })

      b.bundle()
        .on('error', function(err) { console.log('error: ' + err); })
        .on('end', function() { consoleTime('js: ' + item) })
        .pipe(source(_name))
        .pipe(gulp.dest(_path))
    })
  })

})

// Staging 公用 base.js 包
gulp.task('staging-base', function() {
  var b = browserify({
    require: config.nodeModule,
  })
  b.bundle()
    .on('error', function(err) { console.log(err.message); })
    .on('end', function() { consoleTime('Bundle Js: base.js'); })
    .pipe(source('base.js'))
    .pipe(gulp.dest(config.staging + '/nd_pro/common/js'))
})



// Task
gulp.task('default', ['connect', 'watch', 'staging-base']);