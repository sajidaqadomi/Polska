const { src, dest } = require('gulp'),
    plumber = require('gulp-plumber'),


    notify = require("gulp-notify"),

    //  inject = require("gulp-inject")
    browserSync = require('browser-sync').create();

const html = async (done) => {
    await new Promise((res, rej) => {
        src('src/**/*.html')
            .pipe(plumber())
            // .pipe(
            //     inject(
            //         gulpif(
            //             isDev,
            //             src(['temp/js/*.js', 'temp/css/*.css'], { read: false }),
            //             src(['dist/js/*.min.js', 'dist/css/*.min.css'], { read: false })

            //         ),
            //         {
            //             ignorePath: isDev ? temp : dist,
            //             addRootSlash: false
            //         }
            //     )
            // )
            .pipe(dest('dist/'))
            .pipe(browserSync.stream())
            .pipe(notify("Gulp Task [html] completed"))
            .on("end", res)
        done()


    })


}

module.exports = {
    html
}