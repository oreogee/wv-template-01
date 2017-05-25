var gulp = require('gulp');

// 작업파일 경로 설정
var devSrc = 'front_src/src';
var devPaths = {
    scss: devSrc + '/scss/**/*.scss',
    html: devSrc + '/html/**/*.html',
    js: devSrc + '/js/**/*.js',
    sprite: devSrc + '/img/sprite/**/*.png'
}
// 결과물 파일 경로 설정
var buildSrc = 'front_src/dist';

// 여러 개의 파일 하나로 합쳐줌
var concat = require('gulp-concat');
// js파일 압축
var uglify = require('gulp-uglify');
gulp.task('js:build', function(){
    return gulp.src(devPaths.js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(buildSrc + '/js'));
});
gulp.task('js-min:build', function(){
    return gulp.src(devPaths.js)
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildSrc + '/js'));
});

// 여러 css파일이 있을 때 원하는 순서대로 압축하기 위해
// var cssOrder = [devSrc + '/css/reset.css',
//                 devSrc + '/css/common.css',
//                 devSrc + '/css/icons.css'];
// css파일 압축
var minifyCss = require('gulp-minify-css');
// gulp.task('css:build', function(){
//     return gulp.src(cssOrder)
//         .pipe(concat('all.css'))
//         .pipe(gulp.dest(buildSrc + '/css'));
// });
// gulp.task('css-min:build', function(){
//     return gulp.src(cssOrder)
//         .pipe(concat('all.min.css'))
//         .pipe(minifyCss())
//         .pipe(gulp.dest(buildSrc + '/css'));
// });

// sass 컴파일 순서
var sassOrder = [devSrc + '/scss/reset.scss',
                devSrc + '/scss/mixins.scss',
                devSrc + '/scss/spsm_img.scss',
                devSrc + '/scss/icons.scss',
                devSrc + '/scss/style.scss',
                devSrc + '/scss/sp_img.scss'];
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass:build', function () {
    return gulp.src(sassOrder)
        .pipe(concat('all.css'))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(buildSrc + '/css'))
});
gulp.task('sass-min:build', function () {
    return gulp.src(sassOrder)
        .pipe(concat('all.min.css'))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(minifyCss())
        .pipe(gulp.dest(buildSrc + '/css'))
});

gulp.task('html:build', function(){
    return gulp.src(devPaths.html)
        .pipe(gulp.dest(buildSrc + '/html'));
})

// sprite이미지 자동생성해줌
var spritesmith = require('gulp.spritesmith');
gulp.task('spriteMake', function(){
    var spriteData = gulp.src(devPaths.sprite)
                    .pipe(spritesmith({
                        imgName: 'sp_img.png',
                        cssName: 'spsm_img.scss',
                        padding: 10
                    }));
    spriteData.img.pipe(gulp.dest(buildSrc + '/img'));
    spriteData.css.pipe(gulp.dest(devSrc + '/scss'));
})

// 사용할 gulp 플러그인들 한번에 실행-min~으로 바꾸기
var runSequence = require('run-sequence');
gulp.task('build',function(){
    runSequence('sass:build', 'js:build', 'html:build', function(){
        console.log('build COMPLETE!! (sass-min, js-min, html)');
    })
})

// 작업할 때 watch를 켜두면 설정한 개발경로 파일에 변화 감지시 자동 실행
gulp.task('watch', function(){
    gulp.watch(devPaths.scss, ['sass:build']);
    gulp.watch(devPaths.js, ['js:build']);
    gulp.watch(devPaths.html, ['html:build']);
})
