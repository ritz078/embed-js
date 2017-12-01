const fs = require("fs-extra")
const path = require("path")

const rollup = require("rollup")
const buble = require("rollup-plugin-buble")
const json = require("rollup-plugin-json")
const nodent = require("rollup-plugin-nodent")
const commonjs = require("rollup-plugin-commonjs")
const uglify = require("rollup-plugin-uglify")
const nodeResolve = require("rollup-plugin-node-resolve")
const globby = require("globby")
const camelCase = require("lodash/camelCase")
const cssnano = require("cssnano")

const SRC_DIR = "src"
const PACKAGES_DIR = path.resolve(__dirname, "../packages")
const DIST = "dist"

const nodentConfig = {
  promises: true,
  noRuntime: true,
  es6target: true
}

function getPackages() {
  return fs
    .readdirSync(PACKAGES_DIR)
    .map(file => path.resolve(PACKAGES_DIR, file))
    .filter(f => fs.lstatSync(path.resolve(f)).isDirectory())
}

function getPackageName(file, fileName = false) {
  let pkgName = path.relative(PACKAGES_DIR, file).split(path.sep)[0]
  if (fileName) {
    return pkgName === "embed-js" ? "embed" : pkgName
  } else {
    return pkgName
  }
}

function getBuildPath(file, buildFolder) {
  const pkgName = getPackageName(file)
  const pkgSrcPath = path.resolve(PACKAGES_DIR, pkgName, SRC_DIR)
  const pkgBuildPath = path.resolve(PACKAGES_DIR, pkgName, buildFolder)

  const relativeToSrcPath = path.relative(pkgSrcPath, file)
  return path.resolve(pkgBuildPath, relativeToSrcPath)
}

function buildCjs(file) {
  const destPath = getBuildPath(file, DIST)
  const { dependencies = {} } = JSON.parse(
    fs.readFileSync(path.resolve(file, "../", "../", "package.json"), {
      encoding: "utf8"
    })
  )

  rollup
    .rollup({
      input: file,
      external: Object.keys(dependencies),
      plugins: [nodeResolve(), json(), commonjs(), nodent(nodentConfig)]
    })
    .then(bundle => {
      bundle.write({
        format: "cjs",
        file: destPath
      })

      return bundle.generate({
        format: "cjs"
      })
    })
}

function buildUmd(file) {
  const pkgName = getPackageName(file, true)
  const destPath = getBuildPath(file, "umd")

  rollup
    .rollup({
      input: file,
      plugins: [
        nodeResolve(),
        json(),
        commonjs(),
        nodent(nodentConfig),
        buble()
      ]
    })
    .then(bundle =>
      bundle.write({
        format: "umd",
        name: camelCase(pkgName),
        file: path.resolve(destPath, "../", `${pkgName}.js`),
        sourcemap: true
      })
    )
}

function buildUmdMin(file, silent) {
  const pkgName = getPackageName(file, true)
  const destPath = getBuildPath(file, "umd")

  rollup
    .rollup({
      input: file,
      plugins: [
        nodeResolve(),
        json(),
        commonjs(),
        nodent(nodentConfig),
        buble(),
        uglify()
      ]
    })
    .then(bundle =>
      bundle.write({
        format: "umd",
        name: camelCase(pkgName),
        file: path.resolve(destPath, "../", `${pkgName}.min.js`),
        sourcemap: true
      })
    )
}

function writeCss(dest, css) {
  fs.outputFileSync(dest, css)
}

function buildCss(file) {
  const css = fs.readFileSync(file, {
    encoding: "utf8"
  })

  const umdDestPath = getBuildPath(file, "umd")
  const cjsDestPath = getBuildPath(file, DIST)

  const fileName = path.basename(umdDestPath, ".css")
  const fileNameWithExt = `${fileName}.min.css`

  writeCss(cjsDestPath, css)
  writeCss(umdDestPath, css)

  cssnano.process(css).then(result => {
    writeCss(path.resolve(cjsDestPath, "../", fileNameWithExt), result)
    writeCss(path.resolve(umdDestPath, "../", fileNameWithExt), result)
  })
}

function buildPackage(p) {
  const srcDir = path.resolve(p, SRC_DIR)
  const pattern = path.resolve(srcDir, "**/*")
  const files = globby.sync(pattern, {
    nodir: true
  })

  files.forEach(function(file) {
    if (path.extname(file) === ".css") {
      buildCss(file)
    } else {
      if (path.basename(file, ".js") === "index") {
        buildCjs(file)
        buildUmd(file)
        buildUmdMin(file)
      }
    }
  })
}

const packages = getPackages()
packages.forEach(buildPackage)
