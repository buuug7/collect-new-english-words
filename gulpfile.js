const { src, dest, series } = require("gulp");
const zip = require("gulp-zip");
const packageMeta = require("./package.json");

/**
 * copy dependencies files to vendor
 * @return {*}
 */
function copyDependencies() {
  const srcFiles = [
    "node_modules/@buuug7/simplify-button/index.css",
    "node_modules/utilities-css/dist/utilities-css.css",
    "node_modules/react/umd/react.production.min.js",
    "node_modules/react-dom/umd/react-dom.production.min.js",
  ];

  return src(srcFiles, { base: "node_modules" }).pipe(dest("vendor/"));
}

function zipFiles() {
  const zipFiles = [
    "images/*",
    "vendor/**/*",
    "background.js",
    "book.html",
    "book.js",
    "lib.js",
    "main.css",
    "manifest.json",
    "options.html",
    "options.js",
    "popup.html",
    "popup.js",
    "README.md",
  ];

  return src(zipFiles, { base: "." })
    .pipe(zip(`${packageMeta.name}-v${packageMeta.version}.zip`))
    .pipe(dest("."));
}

exports.default = series(copyDependencies, zipFiles);
