const { src, dest, series, watch } = require("gulp");
const zip = require("gulp-zip");
const babel = require("gulp-babel");

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

const filesOfZip = [
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
  "CHANGELOG.md",
];

/**
 * zip files and for uploaded to chrome web store
 * @return {*}
 */
function zipFiles() {
  return src(filesOfZip, { base: "." })
    .pipe(zip(`${packageMeta.name}-v${packageMeta.version}.zip`))
    .pipe(dest("."));
}

const jsxFiles = ["src/**/*.jsx"];

function jsxCompile() {
  return src(jsxFiles).pipe(babel()).pipe(dest("."));
}

function jsxWatch() {
  watch(jsxFiles, function (cb) {
    jsxCompile();
    cb();
  });
}

module.exports = {
  copyDependencies,
  jsxCompile,
  watch: series(jsxWatch),
  default: series(copyDependencies, jsxCompile, zipFiles),
};
