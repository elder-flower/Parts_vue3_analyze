const gulp = require('gulp');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const doiuse = require('doiuse');
const post100vh = require('postcss-100vh-fix');
const autoprefixer = require('autoprefixer');
const cssDeclarationSorter = require('css-declaration-sorter');
const mqpacker = require("css-mqpacker");
const cssnano = require("cssnano");
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');

const imagemin = require("gulp-imagemin");
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const imageminGif = require('imagemin-gifsicle');
const imageminSvg = require('imagemin-svgo');

//test用カスタムpost css
const minmax = require("postcss-minmax");

var bs = require('browser-sync').create();

const { series, parallel } = require('gulp');

const paths = {
    'root'    : './',
    'html': './',
    'i': './images/',
    'scss': './scss/',
    'css': './css/',
    'js': './js/',
    'js2': './js2/'
}
// sassをコンパイル。
function sass_compile(){
    const plugin = [
        //ベンダープレフィックスを自動で追加。
        autoprefixer({ grid: true }),
        //iOSのアドレスバー分の高さを考慮した100vh対応
        //post100vh(),
        //CSSプロパティーの並び順を自動でソート
        cssDeclarationSorter({
          order: 'smacss'
        }),
        //同じメディアクエリーをまとめてくれるプラグイン。
        mqpacker()
    ];
  return gulp.src(paths.scss + '*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      stylelint(),
      //CUIにLintの結果を表示する
      reporter(),
      //サポート対象外のプロパティや@ルールを使っていないかをリントするツール
      doiuse({
           browsers: [
               'ie >= 11'
           ],
            ignore: ['rem'],
            ignoreFiles: ['./_reset.scss'],
            onFeatureUsage: function (usageInfo) {
                console.log(usageInfo.message)
            }
       })
    ]))
    .pipe(postcss(plugin))
    .pipe(gulp.dest(paths.css))
}
exports.sc = sass_compile;

// sassをコンパイルし、browser-syncにストリームで反映。
function sass_compile2(){
    const plugin = [
        autoprefixer({ grid: true }),
        //post100vh(),
        cssDeclarationSorter({
          order: 'smacss'
        }),
        mqpacker()
    ];
  return gulp.src(paths.scss + '*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      stylelint(),
      reporter()
    ]))
    .pipe(postcss(plugin))
    .pipe(gulp.dest(paths.css))
    .pipe(bs.stream())
}
exports.sc2 = sass_compile2;

function sass_compile2a(){
    const plugin = [
        autoprefixer({ grid: true }),
        cssDeclarationSorter({
          order: 'smacss'
        }),
        mqpacker(),
        //minmax()
    ];
  return gulp.src(paths.scss + '*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      //stylelint(),
      reporter(),
    ]))
    .pipe(postcss(plugin))
    .pipe(gulp.dest(paths.css))
    .pipe(bs.stream())
}
exports.sc2a = sass_compile2a;

/* sassをでコンパイル。圧縮付き */
function sass_compile_zip(){
  const plugin = [
    autoprefixer({ grid: true }),
    cssDeclarationSorter({
      order: 'smacss'
    }),
    mqpacker(),
  ];
  return gulp.src(paths.scss + '*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(postcss([
      //stylelint(),
      reporter()
    ]))
    .pipe(postcss(plugin))
    .pipe(gulp.dest(paths.css))
}
exports.sz = sass_compile_zip;

//JSをeslintでチェックしてトランスパイルをして圧縮。
function js_compile_zip2(){
    return gulp.src([
    './js2/setting.js'
    ])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    //.pipe(concat('b.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('js'));
}
exports.jz2 = js_compile_zip2;

//JSをトランスパイルをして圧縮。
function js_compile_zip(){
    return gulp.src([
    './js2/setting.js'
    ])
    //.pipe(babel({
    //        presets: ['@babel/preset-env']
    //    }))
    //JSをまとめる。
    //.pipe(concat('b.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('js'));
}
exports.jz = js_compile_zip;

//JSをトランスパイル。browser-syncでチェック用。
function js_compile(){
    return gulp.src([
    './js2/setting.js'
    ])
    //.pipe(babel({
    //        presets: ['@babel/preset-env']
    //    }))
    ////.pipe(concat('b.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('js'));
}
exports.js = js_compile;

function eslint_check(){
    return gulp.src( paths.js2 + '*.js')
        .pipe(eslint({ useEslintrc: true }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}
exports.es = eslint_check;

function png_zip5(){
    return gulp.src( paths.i + '*.png')
    .pipe(imagemin([
        pngquant({
            quality: [0.4, 0.5]
        }),
    ]))
    .pipe(gulp.dest("imgs5"))
}
exports.p5 = png_zip5;

function png_zip6(){
    return gulp.src( paths.i + '*.png')
    .pipe(imagemin([
        pngquant({
            quality: [0.5, 0.6]
        }),
    ]))
    .pipe(gulp.dest("imgs6"))
}
exports.p6 = png_zip6;

function png_zip7(){
    return gulp.src( paths.i + '*.png')
    .pipe(imagemin([
        pngquant({
            quality: [0.6, 0.7]
        }),
    ]))
    .pipe(gulp.dest("imgs7"))
}
exports.p7 = png_zip7;

//browser-syncを起動。
function bs_sync(done){
  bs.init({
      server: {
          baseDir: paths.root
      },
      port: 8080,
      reloadOnRestart: true
  });
    done();
}
exports.bs = bs_sync;

//browser-syncをリロード。
function bs_reload(done){
  bs.reload();
    done();
}
exports.reload = bs_reload;

function bs_watch(done){
    gulp.watch([paths.scss + '*.scss'], series('sc2') );
    gulp.watch([paths.js2 + '*.js'], series('js', 'reload') );
    gulp.watch([paths.html + '*.html'], series('reload') );
    done();
}
exports.watch = bs_watch;
exports.w = parallel(bs_watch, bs_sync);



function bs_watch2(done){
    gulp.watch([paths.scss + '*.scss'], series('sc2a') );
    gulp.watch([paths.js2 + '*.js'], series('js', 'reload') );
    gulp.watch([paths.html + '*.html'], series('reload') );
    done();
}
exports.watch = bs_watch2;
exports.a = parallel(bs_watch2, bs_sync);

/*

function sass_compile_zip(){
    
}
exports.sc = sass_compile;

*/