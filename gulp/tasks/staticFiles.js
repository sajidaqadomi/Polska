const { src, dest } = require('gulp')


const staticFiles = () => {
    return src('src/imgs/*.{png,svg,jpg}')

        .pipe(dest('dist/imgs'))
}
module.exports = {
    staticFiles
}